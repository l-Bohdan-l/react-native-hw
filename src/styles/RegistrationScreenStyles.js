// import { StyleSheet } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";

const styles = EStyleSheet.create({
    container: {
        // flex: 1,    
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        color: '#212121',
        textAlign: 'center',
        fontFamily: 'Roboto-Regular',
        fontSize: 30,
        fontStyle: 'normal',
        fontWeight: 500,
        // lineHeight: 'normal',
        letterSpacing: 0.3,
    },
    input: {
        width: 343,
        height: 50,
        backgroundColor: '#E8E8E8',
        marginBottom: 16,
        padding: 16,
        borderRadius: 8,
    },
    lastInput: {
        marginBottom: 43,
    },

    placeholder: {
        color:'#BDBDBD',
        fontFamily: 'Roboto-Regular',
        fontSize: 16,        
        fontWeight: 400,        
    },
    
});

export default styles;