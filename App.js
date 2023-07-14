import React, { useCallback, useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Button,
  Text,
} from "react-native";
import { RegistrationScreen } from "./src/components/Screens/RegistrationScreen";
// import { useFonts } from 'expo-font';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
// import { AppLoading } from 'expo';
import EStyleSheet from 'react-native-extended-stylesheet';
EStyleSheet.build({ // always call EStyleSheet.build() even if you don't use global variables!
  $textColor: '#0275d8'
});
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [isReady, setIsReady] = useState(false)
  // const [name, setName] = useState("");
  // const [password, setPassword] = useState("");

  // const loadFonts = async () => {
  // await Font.loadAsync({
  //   "Roboto-Regulat": require("./assets/fonts/Roboto-Regular.ttf"),
  //   "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
  //   "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
  // });
  // };  

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
 
  // if (!isReady) {
  //     return <AppLoading startAsync={loadFonts} onFinish={() => setIsReady(true)}/>
  // }

  // const [fontsLoaded] = useFonts({
  //   "Roboto-Regulat": require("./assets/fonts/Roboto-Regular.ttf"),
  //   "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
  //   "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
  // });

  // const onLayoutRootView = useCallback(async () => {
  //   if (fontsLoaded) {
  //     await SplashScreen.hideAsync();
  //   }
  // }, [fontsLoaded]);

  // if (!fontsLoaded) {
  //   return null;

  // }  

  return (
    <View style={styles.container}
      onLayout={onLayoutRootView}
    >      
      <RegistrationScreen />     
    </View>
    // <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    //   <View style={styles.container}>
    //     <KeyboardAvoidingView
    //       behavior={Platform.OS == "ios" ? "padding" : "height"}
    //     >
    //       <TextInput
    //         value={name}
    //         onChangeText={nameHandler}
    //         placeholder="Username"
    //         style={styles.input}
    //       />
    //       <TextInput
    //         value={password}
    //         onChangeText={passwordHandler}
    //         placeholder="Password"
    //         secureTextEntry={true}
    //         style={styles.input}
    //         keyboardType="numeric"
    //       />
    //       <Button title={"Login"} style={styles.input} onPress={onLogin} />
    //     </KeyboardAvoidingView>
    //   </View>
    // </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontFamily: 'Roboto-Bold',
    fontWeight: "900",
  }
});