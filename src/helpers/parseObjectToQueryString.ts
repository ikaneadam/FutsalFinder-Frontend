export default function parseObjectToQueryString(object: object | undefined): string {
    if (!object) {
        return '';
    }

    let queryString = '';
    for (const key in object) {
        queryString += `&${key}=${(object as any)[key]}`;
    }

    return queryString;
}
