import { configureStore } from '@reduxjs/toolkit'
import keyReducer from './keyReducer'
import loginReducer from './loginReducer'

export default configureStore({
    reducer: {
        login: loginReducer,
        key: keyReducer
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['your/action/type'],
        // Ignore these field paths in all actions
        ignoredActionPaths: ['meta.arg', 'payload.timestamp'],
        // Ignore these paths in the state
        ignoredPaths: ['items.dates'],
      },
    }),
})