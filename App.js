import React, { useState, useEffect } from "react";

import { Provider } from "react-redux";
import { store } from "./store";
import Home from "./screens/App";
import { registerRootComponent } from "expo";

const App = () => {
  
  return (
    <Provider store={store}>
      <Home />
    </Provider>
  );
};

export default App;

registerRootComponent(App);