import { configureStore } from "@reduxjs/toolkit";
import flickerReducer from "../reducer/index";
import createSagaMiddleware from "redux-saga";
import mySaga from "../sagas";

const sagaMiddleware = createSagaMiddleware();

export default configureStore({
  reducer: {
    flicker: flickerReducer,
  },
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(mySaga);
