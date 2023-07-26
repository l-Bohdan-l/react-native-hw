import React, { createContext, useCallback, useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Button,
  Text,
  ImageBackground,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { RegistrationScreen } from "./src/components/Screens/RegistrationScreen";
import { LoginScreen } from "./src/components/Screens/LoginScreen";
import { PostsScreen } from "./src/components/Screens/MainScreen/PostsScreen";
import { CreateScreen } from "./src/components/Screens/MainScreen/CreateScreen";
import { ProfileScreen } from "./src/components/Screens/MainScreen/ProfileScreen";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import useRoute from "./src/hooks/useRoute";
import AuthContext from "./src/hooks/AuthContext";

import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import EStyleSheet from "react-native-extended-stylesheet";
EStyleSheet.build({
  // always call EStyleSheet.build() even if you don't use global variables!
  // $textColor: '#0275d8'
});
SplashScreen.preventAutoHideAsync();

// const AuthStack = createStackNavigator();
// const MainTab = createBottomTabNavigator();

export default function App() {
  // const AuthContext = createContext();
  const [isReady, setIsReady] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const routing = useRoute(isAuth);
  console.log("isAuth", isAuth);

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        await Font.loadAsync({
          "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
          "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
          "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
        });
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setIsReady(true);
      }
    }
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (isReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [isReady]);

  if (!isReady) {
    return null;
  }

  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth }}>
      <View style={styles.container} onLayout={onLayoutRootView}>
        <NavigationContainer>{routing}</NavigationContainer>
      </View>
    </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "flex-end",
    // alignItems: "center",
  },
  text: {
    fontFamily: "Roboto-Bold",
    fontWeight: "900",
  },
  // image: {
  //   flex: 1,
  //   resizeMode: "cover",
  //   justifyContent: "flex-end",
  // },
});
