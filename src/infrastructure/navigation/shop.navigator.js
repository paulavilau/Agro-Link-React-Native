import React from "react";
import { Text } from "react-native";

import {
  createStackNavigator,
  CardStyleInterpolators,
  TransitionPresets,
} from "@react-navigation/stack";

import { ShopScreen } from "../../features/shop/screens/shop.screen";
import { CategoriesScreen } from "../../features/shop/screens/categories.screen";
import { CategoriesContextProvider } from "../../services/categories/categories.context";
import { ClassesContextProvider } from "../../services/classes/classes.context";
import { SearchScreen } from "../../features/shop/screens/search-products.screen";
import { ProductDetailsScreen } from "../../features/shop/screens/product-details.screen";
import { SupplierDetailsScreen } from "../../features/shop/screens/supplier-details.screen";
import { CartItemsContextProvider } from "../../services/cartItems/cartItems.context";

const ShopStack = createStackNavigator();

export const ShopNavigator = () => {
  return (
    <ClassesContextProvider>
      <CategoriesContextProvider>
        <ShopStack.Navigator
          headerMode="screen"
          screenOptions={{
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}
        >
          <ShopStack.Screen
            name="Categories"
            component={CategoriesScreen}
            options={{
              title: "Categorii",
              headerStyle: { height: 0 },
              headerTitleStyle: {
                fontSize: 24,
              },
            }}
          />
          <ShopStack.Screen
            name="Shop"
            component={ShopScreen}
            options={({ route }) => ({ title: route.params.denCateg })}
          />
          <ShopStack.Screen
            name="SearchProduct"
            component={SearchScreen}
            options={{
              title: "",
              headerStyle: { height: 90 },
              headerTitleStyle: { fontSize: 24 },
            }}
          />
          <ShopStack.Screen
            name="ProductDetails"
            component={ProductDetailsScreen}
            options={{ title: "" }}
          />
          <ShopStack.Screen
            name="SupplierDetails"
            component={SupplierDetailsScreen}
            options={{ title: "" }}
          />
        </ShopStack.Navigator>
      </CategoriesContextProvider>
    </ClassesContextProvider>
  );
};
