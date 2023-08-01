import EStyleSheet from "react-native-extended-stylesheet";

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
    // borderTopLeftRadius: 25,
    // borderTopRightRadius: 25,
    backgroundColor: "#FFF",
    // height: 549,
    // paddingTop: 92,
  },
  image: {
    flex: 1,
    // height: 549,
    resizeMode: "cover",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  wrapper: {
    flex: 0.7,
    // justifyContent: "flex-start",
    alignItems: "center",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: "#FFF",
    height: 549,
    width: "100%",
    paddingTop: 32,
  },
  imgBox: {
    position: "absolute",
    top: -60,
    // justifyContent: "center",
    // left: 128,
    width: 120,
    height: 120,
    backgroundColor: "#E8E8E8",
    borderRadius: 16,
  },
  name: {
    marginTop: 62,
    color: "#212121",
    textAlign: "center",
    fontFamily: "Roboto-Regular",
    fontSize: 30,
    fontStyle: "normal",
    fontWeight: 500,
    letterSpacing: 0.3,
  },
  logout: {
    position: "absolute",
    right: 16,
    top: 22,
  },
});

export default styles;
