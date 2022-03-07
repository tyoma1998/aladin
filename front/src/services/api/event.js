import { api } from "./ApiService";

export const getEvent = (id) => {
  return api.get(`/event/get-event/${id}`);
};

export const answerEvent = ({ id, data }) => {
  return api.put(`/event/change-event/${id}`, data);
};

export const getAllEvent = () => {
  return api.get(`/event/get-event-all`);
};
