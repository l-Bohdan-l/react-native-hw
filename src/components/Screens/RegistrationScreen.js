import { ImageBackground, Text, TextInput, View, TouchableOpacity, KeyboardAvoidingView,
  Platform, TouchableWithoutFeedback, Keyboard, Button, Alert, } from "react-native";
import styles from "../../styles/RegistrationScreenStyles";
import EStyleSheet from "react-native-extended-stylesheet";
import { useState } from "react";

export const RegistrationScreen = () => { 
    console.log('121212')
    const [login, setLogin] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [hidePass, setHidePass] = useState(true);
    const [isShownKeyboard, setIsShownKeyboard] = useState(false);

    const loginHandler = (text) => { 
        setLogin(text.trim());
    };
    const emailHandler = (text) => { 
        setEmail(text.trim());
    };
    const passwordHandler = (text) => {
        setPassword(text.trim());
    };
    const showPassword = (e) => {
        setHidePass(!hidePass);
    };

    const handleSubmit = (e) => { 
        // if (!login || !email || !password) {
        //     return Alert.alert('Помилка', 'Заповніть всі поля')
        //  }
        console.log('submit', login, email, password)
        console.log('show', isShownKeyboard)
        setIsShownKeyboard(false)
        Keyboard.dismiss()
    };

    const handleContainerTouch = (e) => { 
        Keyboard.dismiss()
        setIsShownKeyboard(false)
    };
    return (
    <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"}>
        <TouchableWithoutFeedback onPress={handleContainerTouch}>
                <View style={{
                    ...styles.container,
                    justifyContent: isShownKeyboard ? "flex-end" : "flex-start",
                    // height: isShownKeyboard ? 400 : 549,
                }}> 
                    <View style={{
                        ...styles.imgBox,
                        top: isShownKeyboard ? 60 : -60,
                    }}></View>
                <Text style={styles.title}>Реєстрація</Text>
                <View style={styles.from}>
                    <TextInput value={login} onChangeText={loginHandler} style={styles.input} placeholder="Логін" onFocus={() => {setIsShownKeyboard(true)}}/>
                    <TextInput value={email} onChangeText={emailHandler} style={styles.input} keyboardType="email-address" placeholder="Адреса електронної пошти" onFocus={() => {setIsShownKeyboard(true)}}/>                
                    <View>
                            <TextInput value={password} onChangeText={passwordHandler} style={{
                                ...styles.input,
                                ...styles.lastInput,
                                marginBottom: isShownKeyboard ? 10 : 43,
                            }} secureTextEntry={hidePass} placeholder="Пароль" onFocus={() => { setIsShownKeyboard(true) }} /> 
                        <TouchableOpacity style={styles.showPassBtn} onPress={showPassword}>
                            <Text style={styles.showPassBtnText}>Показати</Text>    
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.btn}
                    activeOpacity={0.8}
                    onPress={handleSubmit}>
                        <Text style={styles.btnText}>
                        Зареєструватися
                        </Text>                           
                    </TouchableOpacity>
                    <Text style={styles.haveAccount}>Вже є акаунт? Увійти</Text>
                    </View> 
                </View>
            </TouchableWithoutFeedback>        
    </KeyboardAvoidingView>             
    )
};