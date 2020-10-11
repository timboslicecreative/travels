import Thurl from "thurl";
const THUMBOR_KEY = process.env.THUMBOR_KEY;
const THUMBOR_URL = process.env.THUMBOR_URL;
export const thurl = new Thurl(THUMBOR_URL, THUMBOR_KEY);
