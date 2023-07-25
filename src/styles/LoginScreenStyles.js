// import { StyleSheet } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: "#FFF",
    height: 549,
    paddingTop: 32,
  },

  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  title: {
    color: "#212121",
    textAlign: "center",
    fontFamily: "Roboto-Regular",
    fontSize: 30,
    fontStyle: "normal",
    fontWeight: 500,
    // lineHeight: 'normal',
    letterSpacing: 0.3,
    marginBottom: 33,
  },
  from: {
    marginHorizontal: 16,
    // justifyContent: 'flex-end',
    // marginBottom: 10,
  },
  input: {
    width: 343,
    height: 50,
    backgroundColor: "#E8E8E8",
    marginBottom: 16,
    padding: 16,
    borderRadius: 8,
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    fontWeight: 400,
  },
  lastInput: {
    marginBottom: 43,
  },

  imgBox: {
    position: "absolute",
    top: -60,
    width: 120,
    height: 120,
    backgroundColor: "#E8E8E8",
    borderRadius: 16,
  },

  btn: {
    borderRadius: 100,
    backgroundColor: "#FF6C00",
    height: 50,
    paddingTop: 16,
    paddingBottom: 16,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },

  btnText: {
    color: "#FFF",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    fontWeight: 400,
  },

  haveAccount: {
    color: "#1B4371",
    textAlign: "center",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    fontWeight: 400,
  },

  showPassBtn: {
    position: "absolute",
    right: 16,
    top: 16,
  },

  showPassBtnText: {
    color: "#1B4371",
    // textAlign: 'right',
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    fontWeight: 400,
  },
});

export default styles;
