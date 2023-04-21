import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import { HomeNavigator } from "./home.navigator";
import { ShopNavigator } from "./shop.navigator";
import { MapScreen } from "../../features/map/screens/map.screen";
import { SettingsNavigator } from "./settings.navigator";
import { CartScreen } from "../../features/cart/screens/cart.screen";
import { CartItemsContextProvider } from "../../services/cartItems/cartItems.context";

const Tab = createBottomTabNavigator();

const TAB_ICON = {
  Home: "md-home",
  Shop: "md-list",
  Cart: "md-cart",
  Map: "md-map",
  Settings: "md-settings",
};

const createScreenOptions = ({ route }) => {
  const iconName = TAB_ICON[route.name];
  return {
    tabBarIcon: ({ size, color }) => (
      <Ionicons name={iconName} size={size} color={color} />
    ),
    headerShown: false,
    tabBarActiveTintColor: "tomato",
    tabBarInactiveTintColor: "grey",
  };
};

export const AppNavigator = () => (
  <CartItemsContextProvider>
    <Tab.Navigator screenOptions={createScreenOptions}>
      <Tab.Screen name="Home" component={HomeNavigator} />
      {/* <Tab.Screen name="Restaurants" component={RestaurantsNavigator} /> */}
      <Tab.Screen name="Shop" component={ShopNavigator} />
      {/* <Tab.Screen name="Map" component={MapScreen} /> */}
      <Tab.Screen name="Cart" component={CartScreen} />
      <Tab.Screen name="Settings" component={SettingsNavigator} />
    </Tab.Navigator>
  </CartItemsContextProvider>
);
