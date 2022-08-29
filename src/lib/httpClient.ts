import { Axios } from "axios";

const httpClient = new Axios({
  baseURL: "http://localhost:8080/parcels",
  headers: {
    "Content-Type": "application/json",
  },
});

export { httpClient };
