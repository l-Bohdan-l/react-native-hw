import EStyleSheet from "react-native-extended-stylesheet";

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
    // justifyContent: "center",
    paddingTop: 32,
    paddingHorizontal: 32,
  },
  camera: {
    width: 343,
    height: 240,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    // border: 1 'solid' '#E8E8E8',
    // color: "#F6F6F6 ",
  },
  takePhotoButton: {
    width: 60,
    height: 60,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF",
  },
});

export default styles;
