export function getUrlQuery(
    url: URL,
    queries: Record<string, string | number | undefined>,
    navigationCondition: boolean = true
): { pathname: string; search: string | undefined; fullUrl: string } {
    for (const [key, value] of Object.entries(queries)) {
        if (value !== undefined && navigationCondition) {
            url.searchParams.set(key, value.toString());
        } else {
            url.searchParams.delete(key);
        }
    }

    return { pathname: url.pathname, search: url.search, fullUrl: `${url.pathname}${url.search}` };
}
