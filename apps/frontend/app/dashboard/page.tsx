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

      await Promise.all(
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
    setIsLoading(true);
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/chat/user`,
        { userPrompt },
        { withCredentials: true }
      );
      setAnswer(res.data?.answer);
    } catch (err) {
      console.error("Error in chat:", err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <React.Fragment>
      <div className="flex flex-col justify-center items-center py-6 px-4 gap-4">
        <input
          value={url}
          onChange={handleChangeUrl}
          className="bg-white px-2 py-4 rounded max-w-3xl w-full text-black"
        />
        <button onClick={handleClick}>Extract</button>
      </div>
      <div className="flex flex-col justify-center items-center py-6 px-4 gap-4">
        <input
          value={userPrompt}
          onChange={handleChangePrompt}
          className="bg-white px-2 py-4 rounded max-w-3xl w-full text-black"
        />
        <button onClick={handleChat}>Chat</button>
      </div>
      {answer && <p>{answer}</p>}
    </React.Fragment>
  );
};

export default withProtectedRoute(Dashboard);
