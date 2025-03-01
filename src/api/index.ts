export const RANDOM_USER_URL = "https://randomuser.me/api";
export const RANDOM_USER_SCHEMA_URL = "/jsonSchemas/randomUser.json"

export const fetchMockData = async (url: string): Promise<string> => {
  try {
    const response = await fetch(url);
    const json = await response.json();
    return json;
  } catch (err) {
    return String(err);
  }
};