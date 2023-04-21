import React from "react";
import { Text } from "react-native";

import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";

import { HomeScreen } from "../../features/home/screens/home.screen";
import { AboutUsScreen } from "../../features/home/screens/about-us.screen";
import { CookBookScreen } from "../../features/home/screens/cook-book.screen";

const RestaurantStack = createStackNavigator();

export const HomeNavigator = () => {
  return (
    <RestaurantStack.Navigator
      screenOptions={{
        ...TransitionPresets.ModalPresentationIOS,
        headerShown: false,
      }}
    >
      <RestaurantStack.Screen name="Home" component={HomeScreen} />
      <RestaurantStack.Screen name="AboutUs" component={AboutUsScreen} />
      <RestaurantStack.Screen name="CookBook" component={CookBookScreen} />
    </RestaurantStack.Navigator>
  );
};
