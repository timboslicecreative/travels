const GRAPHQL_API = process.env.GRAPHQL_API;
const PUBLIC_GRAPHQL_API = process.env.NEXT_PUBLIC_GRAPHQL_API;

export async function fetchAPI(query, {variables, api = PUBLIC_GRAPHQL_API} = {}) {
    const res = await fetch(api, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query,
            variables,
        }),
    });
    const json = await res.json();
    if (json.errors) {
        console.error(json.errors);
        throw new Error('Failed to fetch API')
    }
    return json.data
}

export const fetchLive = (query, options) => fetchAPI(query, {...options, api: PUBLIC_GRAPHQL_API});
export const fetchStatic = (query, options) =>  fetchAPI(query, {...options, api: GRAPHQL_API});
