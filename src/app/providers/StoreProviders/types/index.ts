import { rootReducer } from "../reducers";
import { store } from "@/app/providers/StoreProviders/store";

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof store>;
export type AppDispatch = AppStore["dispatch"];
