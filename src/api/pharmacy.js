import axios from "axios";

const CancelToken = axios.CancelToken;
export const source = CancelToken.source();

export const cancelOperation = () => {
  source.cancel();
};

export default axios.create({
  baseURL: "http://localhost:8000/api/v1",
  cancelToken: source.token,
});
