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
import styles from "../../styles/RegistrationScreenStyles";
import EStyleSheet from "react-native-extended-stylesheet";
import { useContext, useState } from "react";
import AuthContext from "../../../src/hooks/AuthContext";
import { authSignUp } from "../../redux/auth/authOperations";
import { useDispatch } from "react-redux";

export const RegistrationScreen = ({ navigation }) => {
  // const { isAuth, setIsAuth } = useContext(AuthContext);
  const initialState = {
    login: "",
    email: "",
    password: "",
  };
  // const [login, setLogin] = useState('');
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  const [hidePass, setHidePass] = useState(true);
  const [isShownKeyboard, setIsShownKeyboard] = useState(false);
  const [state, setState] = useState(initialState);

  const dispatch = useDispatch();

  const loginHandler = (value) => {
    // setLogin(text.trim());
    setState((prevState) => ({ ...prevState, login: value.trim() }));
  };
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
    // console.log("submit state", state);
    // console.log("show", isShownKeyboard);
    console.log("state", state);
    dispatch(authSignUp(state));
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
                  justifyContent: isShownKeyboard ? "flex-end" : "flex-start",
                  // height: isShownKeyboard ? 400 : 549,
                }}
              >
                <View
                  style={{
                    ...styles.imgBox,
                    top: isShownKeyboard ? 60 : -60,
                  }}
                ></View>
                <Text style={styles.title}>Реєстрація</Text>
                <View style={styles.from}>
                  <TextInput
                    value={state.login}
                    onChangeText={loginHandler}
                    onEndEditing={() => {
                      setIsShownKeyboard(false);
                    }}
                    style={styles.input}
                    placeholder="Логін"
                    onFocus={() => {
                      setIsShownKeyboard(true);
                    }}
                  />
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
                        marginBottom: isShownKeyboard ? 10 : 43,
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
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => navigation.navigate("Login")}
                  >
                    <Text
                      style={{
                        ...styles.haveAccount,
                        // marginRight: 5,
                      }}
                    >
                      Вже є акаунт? Увійти
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
