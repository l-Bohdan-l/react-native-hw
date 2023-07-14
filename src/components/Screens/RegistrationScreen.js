import { Text, TextInput, View } from "react-native";
import styles from "../../styles/RegistrationScreenStyles";
import EStyleSheet from "react-native-extended-stylesheet";

export const RegistrationScreen = () => { 
    console.log('121212')
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Registration</Text>
            <View>
                <TextInput style={styles.input} placeholder="Login" placeholderStyle={style.placeholder}/>
                <TextInput style={styles.input} placeholder="Email" placeholderStyle={style.placeholder}/>                
                <TextInput style={[styles.input, styles.lastInput]} placeholder="Password" placeholderStyle={style.placeholder} />                
            </View>
        </View>

    )
};