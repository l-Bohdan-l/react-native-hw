import { StyleSheet } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingTop: 32,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 26,
  },
  postImage: {
    // width: "100vw",
    height: 240,
    marginBottom: 32,
    borderRadius: 8,
  },
  commentInput: {
    width: 100,
    height: 50,
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: 500,
    color: "#BDBDBD",
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 50,
    padding: 16,
  },
  sendIcon: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 34,
    height: 34,
    backgroundColor: "#FF6C00",
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default styles;
