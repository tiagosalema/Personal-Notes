import React, { Component } from "react";
import { createStackNavigator } from "react-navigation";

import RestaurantList from "./components/RestaurantList";
// import Info from "./components/Info";

export default createStackNavigator({
  Home: { screen: RestaurantList }
  // Info: { screen: Info }
});
