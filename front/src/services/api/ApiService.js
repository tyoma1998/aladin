import { API } from "./apiTools";

const DOMAIN = process.env.PORT || "http://localhost:8000";

export const api = new API(DOMAIN);
