export function getCitationUrl(filePath: string){
    const owner = "Yuvadi29";
    const repo = "Second-Brain";
    const branch = "master";

    return `https://github.com/${owner}/${repo}/blob/${branch}/${filePath}`;
}