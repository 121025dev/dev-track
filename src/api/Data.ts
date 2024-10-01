import axios from "axios";

export type Data = { content: Content[] };

export type Content = { type: string, data: any };

export const host = process.env.NODE_ENV === "development" ? import.meta.env.VITE_API_LOCALHOST : import.meta.env.VITE_API_HOST;

export async function getData(token: string): Promise<Data> {
  try {
    const res = await axios.get(host + `/api/data?token=${token}`);
    return res.data;
  }
  catch(e) {
    throw new Error;
  }
}