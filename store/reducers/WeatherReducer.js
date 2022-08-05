import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetch2 } from "../../helper/apiClient";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const getweather = createAsyncThunk("getweather", async (data) => {
  // const token = await AsyncStorage.getItem("token");
  const res = await fetch2(
    "/forecast/hourly?lat=" +
      data.lat +
      "&lon=" +
      data.long +
      "&hours=" +
      data.hours
  );
  // console.log("Weather Reducer: ", res);
  return res;
});

const weatherReducer = createSlice({
  name: "weather",
  initialState: {
    weather: {},
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: {
    [getweather.pending]: (state, action) => {
      state.loading = true;
    },
    [getweather.fulfilled]: (state, action) => {
      state.weather = action.payload;
      state.loading = false;
      AsyncStorage.setItem(
        "weather",
        JSON.stringify(action.payload.data),
      );
    },
    [getweather.rejected]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },
  },
});

export default weatherReducer.reducer;
