import axios from "axios";

const SERVER_URL = `${process.env.SERVER_API}/products`;

export default async function getData() {
  try {
    const res = await axios.get(SERVER_URL);
    const data = res.data;

    return data;
  } catch(err) {
    console.log(err);
  }
}