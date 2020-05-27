export type Event = {
  id: string;
  createdAt: string;
  workGroupId: string
  name: string;
  source: string;
  sourceCreatedAt: string;
  message: string;
  email?: string;
  ip?: string;
  phone?: string;
  fullName?: string;
};

 export type WorkGroup = {
  apiKey: string;
  id: string;
  createdAt: string;
  name: string;
};
