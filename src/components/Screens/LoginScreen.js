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
import { useContext, useState } from "react";
import AuthContext from "../../../src/hooks/AuthContext";
import { useDispatch } from "react-redux";
import { authSignIn } from "../../redux/auth/authOperations";

export const LoginScreen = ({ navigation }) => {
  // const { isAuth, setIsAuth } = useContext(AuthContext);
  const initialState = {
    email: "",
    password: "",
  };
  const [hidePass, setHidePass] = useState(true);
  const [isShownKeyboard, setIsShownKeyboard] = useState(false);
  const [state, setState] = useState(initialState);

  const dispatch = useDispatch();

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
    // console.log("submit state login", state);
    // console.log("show", isShownKeyboard);
    dispatch(authSignIn(state));
    setIsShownKeyboard(false);
    // setIsAuth(true);
    Keyboard.dismiss();
    setState(initialState);
  };

  const handleContainerTouch = (e) => {
    Keyboard.dismiss();
    setIsShownKeyboard(false);
  };
  return (
    <TouchableWithoutFeedback onPress={handleContainerTouch}>
      <View style={styles.container}>
        <ImageBackground
          source={require("../../../src/img/bg-img.png")}
          style={styles.image}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
          >
            <View>
              <View
                style={{
                  ...styles.wrapper,
                  // justifyContent: isShownKeyboard ? "flex-end" : "flex-start",
                  height: isShownKeyboard ? 400 : 549,
                  // paddingTop: 32,
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
                    <Text style={styles.btnText}>Увійти</Text>
                  </TouchableOpacity>
                  {/* <Text
                    style={{
                      ...styles.haveAccount,
                      marginBottom: isShownKeyboard ? 10 : 0,
                    }}
                  >
                    Немає акаунту? Зареєструватися
                  </Text> */}
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => navigation.navigate("Register")}
                  >
                    <Text
                      style={{
                        ...styles.haveAccount,
                        // marginRight: 5,
                      }}
                    >
                      Немає акаунту?{" "}
                      <Text
                        style={{
                          textDecorationLine: "underline",
                          marginLeft: 20,
                        }}
                      >
                        Зареєструватися
                      </Text>
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};
