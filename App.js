import React, { createContext, useCallback, useEffect, useState } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import {
  StyleSheet,
  View,  
} from "react-native";

import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import EStyleSheet from "react-native-extended-stylesheet";
import { store } from "./src/redux/store";
import { Main } from "./src/components/Main";
EStyleSheet.build({
  // always call EStyleSheet.build() even if you don't use global variables!
  // $textColor: '#0275d8'
});
SplashScreen.preventAutoHideAsync();

// const AuthStack = createStackNavigator();
// const MainTab = createBottomTabNavigator();

export default function App() {
  const [isReady, setIsReady] = useState(false);  

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
    
    <Provider store={store}>
      <View style={styles.container} onLayout={onLayoutRootView}>        
        <Main />
      </View>
    </Provider>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,    
  },
  text: {
    fontFamily: "Roboto-Bold",
    fontWeight: "900",
  },  
});
