"use client";
import axios from "axios";
import * as React from "react";
import withProtectedRoute from "@/utils/withProtectedRoute";
import { extractRepoDetails, getGithubReadme } from "@/utils/utilities";
import { processMarkdown } from "@/utils/markdown-parser";

function Dashboard() {
  // github url
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
    // 1. Extract repo details, if correct move to step 2 or show error
    const repoDetails = extractRepoDetails(url);

    if (!repoDetails) {
      alert("Invalid GitHub URL");
      return null;
    }

    const { owner, repo } = repoDetails;

    let urlId = null;
    // 2. Save the url first
    try {
      let res = await axios({
        method: "post",
        url: `${process.env.NEXT_PUBLIC_API_URL}/github/github-url`,
        data: {
          githubUrl: url,
        },
        withCredentials: true,
      });
      urlId = res?.data?.data?.id;
    } catch (err) {
      console.log("Problems encountered while saving github url", err);
    }

    // 3. Save the sections of the readme in db
    //Todo: Introduce batching for this request
    try {
      let repoReadmeContent = await getGithubReadme(owner, repo);
      const { sections } = processMarkdown(repoReadmeContent);
      for (let section of sections) {
        let res = await axios({
          method: "post",
          url: `${process.env.NEXT_PUBLIC_API_URL}/github/github-url-section`,
          data: {
            githubUrlId: urlId,
            content: section.content,
          },
          withCredentials: true,
        });
      }
    } catch (err) {
      console.log("Error encountered while saving sections in db", err);
    }

    setIsLoading(false);
  };

  const handleChat = async () => {
    setIsLoading(true);
    try {
      const res = await axios({
        method: "post",
        url: `${process.env.NEXT_PUBLIC_API_URL}/chat/user`,
        data: {
          userPrompt,
        },
        withCredentials: true,
      });
      setAnswer(res?.data?.answer);
    } catch (err) {
      console.log("Error encountered", err);
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
      {!!answer && <p>{answer}</p>}
    </React.Fragment>
  );
}

export default withProtectedRoute(Dashboard);
