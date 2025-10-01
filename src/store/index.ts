import { configureStore } from '@reduxjs/toolkit'
import { projectApi } from './projectApi'
import { setupListeners } from '@reduxjs/toolkit/query'
import { simulationApi } from './simulationApi'

export const store = configureStore({
  reducer: {
    [projectApi.reducerPath]: projectApi.reducer,
    [simulationApi.reducerPath]: simulationApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(projectApi.middleware, simulationApi.middleware),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch


// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch)