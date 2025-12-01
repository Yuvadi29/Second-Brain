"use server";

import pdfParse from "pdf-parse";
import mammoth from "mammoth";

const OWNER = process.env.GITHUB_REPO_OWNER!;
const REPO = process.env.GITHUB_REPO_NAME!;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN!;

function extOf(path: string): string {
  const parts = path.toLowerCase().split(".");
  return parts.length > 1 ? parts.pop()! : "";
}

export async function extractTextFromGithubFile(
  path: string,
  ref: string
): Promise<string | null> {
  const ext = extOf(path);

  const res = await fetch(
    `https://api.github.com/repos/${OWNER}/${REPO}/contents/${encodeURIComponent(
      path
    )}?ref=${ref}`,
    {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        Accept: "application/vnd.github.v3.raw",
      },
    }
  );

  if (res.status === 404) {
    console.warn("[extractGithubFile] 404 for", path, "ref", ref);
    return null;
  }

  if (!res.ok) {
    console.error(
      "[extractGithubFile] GitHub error",
      res.status,
      await res.text()
    );
    return null;
  }

  // Text-ish files: md, txt, code, etc.
  const textExtensions = [
    "md",
    "mdx",
    "txt",
    "ts",
    "tsx",
    "js",
    "jsx",
    "py",
    "json",
    "yml",
    "yaml"
  ];

  if (textExtensions.includes(ext)) {
    return await res.text();
  }

  // Binary formats
  const arrayBuffer = await res.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  if (ext === "pdf") {
    const parsed = await pdfParse(buffer);
    return parsed.text;
  }

  if (ext === "docx") {
    const result = await mammoth.extractRawText({ buffer });
    return result.value;
  }

  console.warn("[extractGithubFile] Unsupported extension:", ext, "for", path);
  return null;
}
