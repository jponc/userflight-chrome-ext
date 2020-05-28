import { config } from "../config";
import { WorkGroup } from "../common/types";
import { buildHeaders } from "./utils";

export const fetchWorkGroups = async (token: string): Promise<WorkGroup[]> => {
  const url = `${config.apiHost}/work-groups`;

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

export const fetchWorkGroup = async (token: string, workGroupId: string): Promise<WorkGroup> => {
  const url = `${config.apiHost}/work-groups/${workGroupId}`;

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
