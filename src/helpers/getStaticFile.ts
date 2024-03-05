export function getStaticFile(fileUrl: string) {
    const backendApiUrl = process.env.REACT_APP_BACKEND_API_URL;
    return `${backendApiUrl}/static/${fileUrl}`;
}
