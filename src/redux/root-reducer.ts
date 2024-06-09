import { baseApi } from "./api/apiSlice";

export const reducer = {
  [baseApi.reducerPath]: baseApi.reducer,
};
