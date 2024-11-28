import { baseApi } from "./api/apiSlice";
import displayOptionSlice from "./features/document-editor/display-options/display-option-slice";

export const reducer = {
  [baseApi.reducerPath]: baseApi.reducer,
  displayOptions: displayOptionSlice,
};
