export const RANDOM_USER_URL = "https://randomuser.me/api";
export const JSON_PLACEHOLDER_URL = "https://jsonplaceholder.typicode.com/todos/1";

export const RANDOM_USER_SCHEMA_URL = "/jsonSchemas/randomUser.json"
export const JSON_PLACEHOLDER_SCHEMA_URL = "/jsonSchemas/jsonPlaceholder.json";

export const fetchMockData = async (url: string): Promise<string> => {
  try {
    const response = await fetch(url);
    const json = await response.json();
    return json;
  } catch (err) {
    console.error(err);
    return '';
  }
};