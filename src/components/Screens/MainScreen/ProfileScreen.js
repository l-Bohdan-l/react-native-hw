import React from "react";
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import styles from "../../../styles/ProfileScreenStyle";
import Logout from "../../../img/svg/logout.svg";

export const ProfileScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../../../src/img/bg-img.png")}
        style={styles.image}
      >
        <View style={styles.wrapper}>
          <View
            style={{
              ...styles.imgBox,
              // top: isShownKeyboard ? 60 : -60,
            }}
          ></View>
          <View style={styles.logout}>
            <TouchableOpacity activeOpacity={0.8}>
              <Logout />
            </TouchableOpacity>
          </View>
          <Text style={styles.name}>Natali Romanova</Text>
        </View>
      </ImageBackground>
    </View>
  );
};
