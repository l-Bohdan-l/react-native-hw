import {
  ImageBackground,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Button,
  Alert,
} from "react-native";
import styles from "../../styles/LoginScreenStyles";
import { useState } from "react";

export const LoginScreen = () => {
  const initialState = {
    email: "",
    password: "",
  };
  const [hidePass, setHidePass] = useState(true);
  const [isShownKeyboard, setIsShownKeyboard] = useState(false);
  const [state, setState] = useState(initialState);

  const emailHandler = (value) => {
    // setEmail(text.trim());
    setState((prevState) => ({ ...prevState, email: value.trim() }));
  };
  const passwordHandler = (value) => {
    // setPassword(text.trim());
    setState((prevState) => ({ ...prevState, password: value.trim() }));
  };

  const showPassword = (e) => {
    setHidePass(!hidePass);
  };

  const handleSubmit = (e) => {
    // if (!login || !email || !password) {
    //     return Alert.alert('Помилка', 'Заповніть всі поля')
    //  }
    // console.log('submit', login, email, password)
    console.log("submit state login", state);
    console.log("show", isShownKeyboard);
    setIsShownKeyboard(false);
    Keyboard.dismiss();
    setState(initialState);
  };

  const handleContainerTouch = (e) => {
    Keyboard.dismiss();
    setIsShownKeyboard(false);
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={handleContainerTouch}>
        <View
          style={{
            ...styles.container,
            justifyContent: isShownKeyboard ? "flex-end" : "flex-start",
            height: isShownKeyboard ? 400 : 549,
          }}
        >
          <Text style={styles.title}>Увійти</Text>
          <View style={styles.from}>
            <TextInput
              value={state.email}
              onChangeText={emailHandler}
              onEndEditing={() => {
                setIsShownKeyboard(false);
              }}
              style={styles.input}
              keyboardType="email-address"
              placeholder="Адреса електронної пошти"
              onFocus={() => {
                setIsShownKeyboard(true);
              }}
            />
            <View>
              <TextInput
                value={state.password}
                onChangeText={passwordHandler}
                style={{
                  ...styles.input,
                  ...styles.lastInput,
                  //   marginBottom: isShownKeyboard ? 10 : 43,
                }}
                secureTextEntry={hidePass}
                onEndEditing={() => {
                  setIsShownKeyboard(false);
                }}
                placeholder="Пароль"
                onFocus={() => {
                  setIsShownKeyboard(true);
                }}
              />
              <TouchableOpacity
                style={styles.showPassBtn}
                onPress={showPassword}
              >
                <Text style={styles.showPassBtnText}>Показати</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.btn}
              activeOpacity={0.8}
              onPress={handleSubmit}
            >
              <Text style={styles.btnText}>Зареєструватися</Text>
            </TouchableOpacity>
            <Text
              style={{
                ...styles.haveAccount,
                marginBottom: isShownKeyboard ? 10 : 0,
              }}
            >
              Немає акаунту? Зареєструватися
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
