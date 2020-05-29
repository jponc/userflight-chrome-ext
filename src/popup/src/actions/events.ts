import { config } from "../config";
import { buildHeaders } from "./utils";
import { Event, UserQuery } from "../common/types";

export const fetchAutocompletePriorityEvents = async (
  token: string,
  workGroupId: string,
  query: string
): Promise<Event[]> => {
  const url = `${config.apiHost}/work-groups/${workGroupId}/events?query=${query}&sort=priority`;

  const res = await fetch(url, {
    headers: buildHeaders(token),
    method: "GET",
  });

  if (!res.ok) {
    throw new Error("Unauthorised");
  }

  const json = await res.json();
  return json.body;
};

export const fetchEventsForCustomer = async (
  token: string,
  workGroupId: string,
  userQuery: UserQuery
): Promise<Event[]> => {
  const url = `${config.apiHost}/work-groups/${workGroupId}/events?email=${userQuery.email || ""}&fullName=${userQuery.fullName || ""}&ip=${userQuery.ip || ""}&phone=${userQuery.phone || ""}`;

  const res = await fetch(url, {
    headers: buildHeaders(token),
    method: "GET",
  });

  if (!res.ok) {
    throw new Error("Unauthorised");
  }

  const json = await res.json();
  return json.body;
};

export const storeQueryToStorage = (query: string) => {
  localStorage.setItem("query", query);
};

export const storeUserQueryToStorage = (userQuery: UserQuery) => {
  localStorage.setItem("userQuery", JSON.stringify(userQuery));
};

export const getQueryFormStorage = (): string | null => {
  return localStorage.getItem("query");
};

export const getUserQueryFromStorage = (): UserQuery | null => {
  const userQuery = localStorage.getItem("userQuery");

  if (userQuery) {
    return JSON.parse(userQuery);
  } else {
    return null;
  }
};

export const removeUserQueryFromStorage = () => {
  localStorage.removeItem("userQuery");
};
