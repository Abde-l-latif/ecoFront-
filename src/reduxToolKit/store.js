import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./slices/userSlice.js";
import ProductSlice from "./slices/productSlice.js";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const UserpersistConfig = {
  key: "root",
  storage,
};
const ProductpersistConfig = {
  key: "product",
  storage,
};

const persistedReducer = persistReducer(UserpersistConfig, UserSlice);
const persistedReducerTwo = persistReducer(ProductpersistConfig, ProductSlice);

export const store = configureStore({
  reducer: {
    USER: persistedReducer,
    PRODUCT: persistedReducerTwo,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
      },
    }),
});

export const persistor = persistStore(store);
