import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {apiSlice} from './apis';
import addFundReducer from './features/addFundSlice';
import uiReducer from './features/ui';
import userSlice from './features/user';
import {apiV2Slice} from './avpiV2';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer, persistStore} from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedUiReducer = persistReducer(persistConfig, uiReducer);
const persistedUserReducer = persistReducer(persistConfig, userSlice);

const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  [apiV2Slice.reducerPath]: apiV2Slice.reducer,
  addFund: addFundReducer,
  ui: persistedUiReducer,
  addBank: addFundReducer,
  user: persistedUserReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
      .concat(apiSlice.middleware)
      .concat(apiV2Slice.middleware),
});

export default store;

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
