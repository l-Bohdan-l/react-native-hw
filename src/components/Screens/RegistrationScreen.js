import { ImageBackground, Text, TextInput, View, TouchableOpacity, KeyboardAvoidingView,
  Platform, TouchableWithoutFeedback, Keyboard, } from "react-native";
import styles from "../../styles/RegistrationScreenStyles";
import EStyleSheet from "react-native-extended-stylesheet";
import { useState } from "react";

export const RegistrationScreen = () => { 
    console.log('121212')
    const [login, setLogin] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const loginHandler = (text) => { 
        setLogin(text);
    };
    const emailHandler = (text) => { 
        setEmail(text);
    };
    const passwordHandler = (text) => {
        setPassword(text);
    };

    return (               
        // <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}> 
                <View style={styles.imgBox}></View>
                <Text style={styles.title}>Реєстрація</Text>
                <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"}>
                    <View style={styles.from}>
                        <TextInput value={login} onChangeText={loginHandler} style={styles.input} placeholder="Логін"/>
                        <TextInput value={email} onChangeText={emailHandler} style={styles.input} keyboardType="email-address" placeholder="Адреса електронної пошти"/>                
                        <TextInput value={password} onChangeText={passwordHandler} style={[styles.input, styles.lastInput]} placeholder="Пароль" />  
                        <TouchableOpacity style={styles.btn}>
                            <Text style={styles.btnText}>
                                Зареєструватися
                            </Text>
                        </TouchableOpacity>
                        <Text style={styles.haveAccount}>Вже є акаунт? Увійти</Text>
                    </View>   
                </KeyboardAvoidingView>             
            </View>
        // </TouchableWithoutFeedback>   
    )
};