import { API } from "./apiTools";

const DOMAIN =
  process.env.PORT ||
  "https://spring-aladin.herokuapp.com" ||
  "http://localhost:8000";

export const api = new API(DOMAIN);
