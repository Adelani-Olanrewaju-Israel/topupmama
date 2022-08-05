import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import WeatherReducer from "./reducers/WeatherReducer";
import thunk from "redux-thunk";

const middleware = [thunk]

export const store = configureStore({
    reducer: {
        weather: WeatherReducer,
    },
    middleware: (applyMiddleware) => applyMiddleware(middleware),
})