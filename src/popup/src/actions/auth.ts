import { config } from "../config";

export const login = async (
  username: string,
  password: string
): Promise<string> => {
  const url = `${config.apiHost}/login`;

  const res = await fetch(url, {
    method: "POST",
    body: JSON.stringify({
      username,
      password,
    }),
  });

  if (!res.ok) {
    throw new Error("Unauthorised");
  }

  const json = await res.json();
  return json.body;
};

export const setTokenToStorage = (token: string): void => {
  localStorage.setItem('token', token);
}

export const getTokenFromStorage = (): string => {
  return localStorage.getItem('token') || "";
};
