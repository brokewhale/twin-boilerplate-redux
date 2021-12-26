import { createStore, applyMiddleware, combineReducers } from "redux";
import { HYDRATE, createWrapper } from "next-redux-wrapper";
import thunkMiddleware from "redux-thunk";
import expireIn from "redux-persist-transform-expire-in";
import auth from "../slice/auth/reducer";
import storage from "./sync_storage";
import expireTransform from "redux-persist-expire-transform";
// import storage from "redux-persist/lib/storage";
// import storageSession from "redux-persist/lib/storage/session";

const bindMiddleware = (middleware) => {
  if (process.env.NODE_ENV !== "production") {
    const { composeWithDevTools } = require("redux-devtools-extension");
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

const reducerWithExpiration = [
  // your reducers
  "auth",
];
const combinedReducer = combineReducers({
  auth,
});

const reducer = (state, action) => {
  return combinedReducer(state, action);
};

const initStore = ({ isServer }) => {
  if (isServer) {
    return createStore(reducer, bindMiddleware([thunkMiddleware]));
  } else {
    //If it's on client side, create a store which will persist
    const { persistStore, persistReducer } = require("redux-persist");

    const persistConfig = {
      key: "nextjs",
      whitelist: ["auth"], // only counter will be persisted, add other reducers if needed
      storage, // if needed, use a safer storage
      transforms: [expireTransform(1, reducerWithExpiration)],
    };
    const persistedReducer = persistReducer(persistConfig, combinedReducer); // Create a new reducer with our existing reducer
    const store = createStore(
      persistedReducer,
      bindMiddleware([thunkMiddleware])
    ); // Creating the store again

    store.__persistor = persistStore(store); // This creates a persistor object & push that persisted object to .__persistor, so that we can avail the persistability feature

    return store;
  }
};

export const wrapper = createWrapper(initStore);
