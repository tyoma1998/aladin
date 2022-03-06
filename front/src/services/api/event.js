import { api } from "./ApiService";

export const getEvent = (id) => {
  return api.get(`/event/get-event/${id}`);
};
