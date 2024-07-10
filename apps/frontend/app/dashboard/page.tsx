"use client";
import axios from "axios";
import * as React from "react";
import withProtectedRoute from "@/utils/withProtectedRoute";
import { extractRepoDetails, getGithubReadme } from "@/utils/utilities";
import { processMarkdown } from "@/utils/markdown-parser";

function Dashboard() {
  // github url
  const [url, setUrl] = React.useState<string>("");

  const handleChangeUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };

  const handleClick = async () => {
    // Save the url first

    try {
      let res = await axios({
        method: "post",
        url: `${process.env.NEXT_PUBLIC_API_URL}/github/github-url`,
        data: {
          githubUrl: url,
        },
        withCredentials: true,
      });
    } catch (err) {
      console.log("Problems encountered while saving github url", err);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center py-6 px-4 gap-4">
      <input
        value={url}
        onChange={handleChangeUrl}
        className="bg-white px-2 py-4 rounded max-w-3xl w-full text-black"
      />
      <button onClick={handleClick}>Extract</button>
    </div>
  );
}

export default withProtectedRoute(Dashboard);
