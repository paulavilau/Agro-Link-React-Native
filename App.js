import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { ThemeProvider } from "styled-components/native";
import {
  useFonts as useOswald,
  Oswald_400Regular,
} from "@expo-google-fonts/oswald";
import { useFonts as useLato, Lato_400Regular } from "@expo-google-fonts/lato";

import { theme } from "./src/infrastructure/theme";
import { Navigation } from "./src/infrastructure/navigation";

import { AuthenticationContextProvider } from "./src/services/authentication/authentication.context";
import { CartItemsContextProvider } from "./src/services/cartItems/cartItems.context";

import firebase from "firebase/compat/app";

const firebaseConfig = {
  apiKey: "AIzaSyDReSDJcYh_yLzIc8gMdHtQKhlUExtygE0",
  authDomain: "mealstogo-a5948.firebaseapp.com",
  projectId: "mealstogo-a5948",
  storageBucket: "mealstogo-a5948.appspot.com",
  messagingSenderId: "217690511861",
  appId: "1:217690511861:web:8c2f9ba61e25e2d0fd68bc",
};

firebase.initializeApp(firebaseConfig);

export default function App() {
  const [oswaldLoaded] = useOswald({
    Oswald_400Regular,
  });

  const [latoLoaded] = useLato({
    Lato_400Regular,
  });

  if (!oswaldLoaded || !latoLoaded) {
    return null;
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <AuthenticationContextProvider>
          <Navigation />
        </AuthenticationContextProvider>
      </ThemeProvider>
      <ExpoStatusBar style="auto" />
    </>
  );
}
