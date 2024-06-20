import { Octokit } from "octokit";

const octokit = new Octokit();

export async function getGithubReadme() {
  const res = await octokit.request("GET /repos/calcom/cal.com/readme", {
    owner: "calcom",
    repo: "cal.com",
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });

  // Decode the base64 content
  const decodedContent = Buffer.from(res.data.content, "base64").toString(
    "utf-8"
  );
  console.log(decodedContent);
  return decodedContent;
}
