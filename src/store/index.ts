import { configureStore } from "@reduxjs/toolkit";
import { projectApi } from "./projectApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import { simulationApi } from "./simulationApi";
import { projectReducer } from "./projectSlice";
import { simulationReducer } from "./simulationSlice";
import { modelApi } from "./modelApi";
import modelReducer from "./modelSlice";
import { auralizationApi } from "./auralizationApi";

export const store = configureStore({
  reducer: {
    [projectApi.reducerPath]: projectApi.reducer,
    [simulationApi.reducerPath]: simulationApi.reducer,
    [modelApi.reducerPath]: modelApi.reducer,
    [auralizationApi.reducerPath]: auralizationApi.reducer,
    project: projectReducer,
    simulation: simulationReducer,
    model: modelReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["model/storeRhinoFile", "auralizationApi/executeQuery/fulfilled"],
        // Ignore the entire auralizationApi reducer path so binary ArrayBuffer responses
        // stored by RTK Query won't trigger the serializable-state middleware.
        ignoredPaths: ["model.rhinoFiles", auralizationApi.reducerPath],
      },
    }).concat(
      projectApi.middleware,
      simulationApi.middleware,
      modelApi.middleware,
      auralizationApi.middleware,
    ),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);
