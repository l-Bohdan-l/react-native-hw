import { StyleSheet } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingTop: 32,
    paddingLeft: 16,
    paddingRight: 16,
  },
  userPhotoWrapper: {
    // flex: 1,
    flexDirection: "row",
    marginBottom: 32,
  },
  userPhoto: {
    borderRadius: 16,
    width: 60,
    height: 60,
    backgroundColor: "#C4C4C4",
    // marginTop: 32,
    // marginLeft: 16,
    marginRight: 8,
  },
  userInfoWrapper: {
    flexDirection: "column",
    justifyContent: "center",
  },
  userName: {
    color: "#212121",
    fontFamily: "Roboto-Bold",
    fontSize: 13,
    fontStyle: "normal",
    fontWeight: 700,
  },
  userEmail: {
    color: "rgba(33, 33, 33, 0.80)",
    fontFamily: "Roboto-Regular",
    fontSize: 11,
    fontStyle: "normal",
    fontWeight: 400,
  },
  postImage: {
    // width: "100vw",
    height: 240,
    marginBottom: 8,
    borderRadius: 8,
  },
  postTitle: {
    color: "#212121",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: 500,
    marginBottom: 8,
  },
  commentsWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  likes: {
    color: "#BDBDBD",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: 400,
  },
  locationWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  location: {
    color: "#212121",
    textAlign: "right",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: 400,
    textDecorationLine: "underline",
    marginLeft: 4,
    // width: 227,
  },
});

export default styles;
