import React from "react";
import { StyleSheet, View, Text, ImageBackground } from "react-native";
import styles from "../../../styles/ProfileScreenStyle";

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
          <Text>ProfileScreen</Text>
        </View>
      </ImageBackground>
    </View>
  );
};
