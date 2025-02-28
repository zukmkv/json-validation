export const MOCKAPI_URL = "https://67c1b98861d8935867e40be7.mockapi.io/api/users";
export const RANDOM_USER_URL = "https://randomuser.me/api";
export const JSON_PLACEHOLDER_URL = "https://jsonplaceholder.typicode.com/todos/1";

export const fetchMockData = async (url: string): Promise<string> => {
  const response = await fetch(url);
  const json = await response.json()
  return json;
}