import { Octokit } from "octokit";

const octokit = new Octokit();

export const extractRepoDetails = (url: string) => {
  const regex = /github\.com\/([^\/]+)\/([^\/]+)/;
  const match = url.match(regex);

  if (match) {
    const owner = match[1];
    const repo = match[2];
    return { owner, repo };
  } else {
    return undefined;
  }
};

export async function getGithubReadme(owner: string, repo: string) {
  const res = await octokit.request(`GET /repos/${owner}/${repo}/readme`, {
    owner,
    repo,
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });

  // Decode the base64 content
  const decodedContent = Buffer.from(res.data.content, "base64").toString(
    "utf-8"
  );
  return decodedContent;
}
