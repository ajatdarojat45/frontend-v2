import { configureStore } from "@reduxjs/toolkit";
import { projectApi } from "./projectApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import { simulationApi } from "./simulationApi";
import { projectReducer } from "./projectSlice";
import { modelApi } from './modelApi'
import modelReducer from './modelSlice'

export const store = configureStore({
  reducer: {
    [projectApi.reducerPath]: projectApi.reducer,
    [simulationApi.reducerPath]: simulationApi.reducer,
    project: projectReducer,
    [modelApi.reducerPath]: modelApi.reducer,
    model: modelReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['model/storeRhinoFile'],
        ignoredPaths: ['model.rhinoFiles'],
      },
    }).concat(projectApi.middleware, simulationApi.middleware, modelApi.middleware),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);
