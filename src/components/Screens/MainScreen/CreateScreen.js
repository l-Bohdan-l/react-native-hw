import React, { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Camera, CameraType } from "expo-camera";

import { Feather, Ionicons } from "@expo/vector-icons";

import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { ProfileScreen } from "./ProfileScreen";
import styles from "../../../styles/CreateScreenStyles";

export const CreateScreen = ({ navigation }) => {
  const [camera, setCamera] = useState(null);
  const talePhoto = async () => {
    console.log("snp", camera);
   
  };
  return (
    <View style={styles.container}>
      <Camera style={styles.camera} ref={setCamera}>
        <TouchableOpacity
          onPress={talePhoto}
          style={styles.takePhotoButton}
          activeOpacity={0.75}
        >
          {/* <Feather name="camera" size={24} color="grey" fill="black" />
           */}
          <Ionicons name="camera" size={24} color="grey" />
        </TouchableOpacity>
      </Camera>
    </View>
  );
};
