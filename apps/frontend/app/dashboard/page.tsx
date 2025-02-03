"use client";

import axios from "axios";
import * as React from "react";
import withProtectedRoute from "@/utils/withProtectedRoute";
import { extractRepoDetails, getGithubReadme } from "@/utils/utilities";
import { processMarkdown } from "@/utils/markdown-parser";

const Dashboard: React.FC = () => {
  const [url, setUrl] = React.useState<string>("");
  const [userPrompt, setUserPrompt] = React.useState<string>("");
  const [answer, setAnswer] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isChatLoading, setIsChatLoading] = React.useState<boolean>(false);

  const handleChangeUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };

  const handleChangePrompt = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserPrompt(e.target.value);
  };

  const handleClick = async () => {
    setIsLoading(true);
    const repoDetails = extractRepoDetails(url);

    if (!repoDetails) {
      alert("Invalid GitHub URL");
      setIsLoading(false);
      return;
    }

    const { owner, repo } = repoDetails;

    try {
      const urlResponse = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/github/github-url`,
        { githubUrl: url },
        { withCredentials: true }
      );
      const urlId = urlResponse.data?.data?.id;

      const repoReadmeContent = await getGithubReadme(owner, repo);
      const { sections } = processMarkdown(repoReadmeContent);

      await Promise.allSettled(
        sections.map((section) =>
          axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/github/github-url-section`,
            { githubUrlId: urlId, content: section.content },
            { withCredentials: true }
          )
        )
      );
    } catch (err) {
      console.error("Error processing GitHub URL:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChat = async () => {
    setIsChatLoading(true);
    setAnswer(null);
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/chat/user`,
        { userPrompt },
        { withCredentials: true }
      );
      const response = res.data?.answer;
      let currentText = "";
      const typeEffect = setInterval(() => {
        if (response && currentText.length < response.length) {
          currentText += response[currentText.length];
          setAnswer(currentText);
        } else {
          clearInterval(typeEffect);
        }
      }, 50);
    } catch (err) {
      console.error("Error in chat:", err);
    } finally {
      setIsChatLoading(false);
    }
  };

  return (
    <React.Fragment>
      <div className="flex flex-wrap gap-6 justify-center items-start px-4 py-6">
        <div className="w-full md:w-1/2 bg-gray-800 p-6 rounded shadow-md">
          <h2 className="text-xl font-semibold text-gray-100 mb-4">
            GitHub URL
          </h2>
          <input
            value={url}
            onChange={handleChangeUrl}
            placeholder="Paste GitHub URL"
            className="bg-gray-700 text-gray-100 px-4 py-3 rounded w-full border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleClick}
            className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Extract
          </button>
          {isLoading && (
            <div className="mt-4 flex justify-center items-center">
              <div className="loader border-t-2 border-blue-500 rounded-full w-6 h-6 animate-spin"></div>
              <p className="ml-2 text-blue-500">Processing...</p>
            </div>
          )}
        </div>

        <div className="w-full md:w-1/2 bg-gray-800 p-6 rounded shadow-md">
          <h2 className="text-xl font-semibold text-gray-100 mb-4">
            Ask a Question
          </h2>
          <input
            value={userPrompt}
            onChange={handleChangePrompt}
            placeholder="Type your question here"
            className="bg-gray-700 text-gray-100 px-4 py-3 rounded w-full border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            onClick={handleChat}
            className="mt-4 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Chat
          </button>
          {isChatLoading && (
            <div className="mt-4 flex justify-center items-center">
              <div className="loader border-t-2 border-green-500 rounded-full w-6 h-6 animate-spin"></div>
              <p className="ml-2 text-green-500">Fetching response...</p>
            </div>
          )}
          {answer && (
            <div className="mt-4 bg-gray-700 p-4 rounded text-gray-100">
              <h3 className="text-lg font-semibold">AI Response:</h3>
              <p className="mt-2">{answer}</p>
            </div>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default withProtectedRoute(Dashboard);
