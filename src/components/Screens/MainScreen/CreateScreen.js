import React, { useEffect, useState } from "react";
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
  Button,
  Image,
} from "react-native";
import { ProfileScreen } from "./ProfileScreen";
import styles from "../../../styles/CreateScreenStyles";

export const CreateScreen = ({ navigation }) => {
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [cameraRef, setCameraRef] = useState(null);
  const [type, setType] = useState(CameraType.back);
  const [photo, setPhoto] = useState("");
  console.log("permission", permission);

  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }
  /* @end */

  /* @hide if (!permission.granted) ... */
  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }
  const takePhoto = async () => {
    if (cameraRef) {
      const { uri } = await cameraRef.takePictureAsync();
      console.log("uri", uri);
      setPhoto(uri);
    }
  };
  return (
    <View style={styles.container}>
      {!photo && (
        <Camera style={styles.camera} ref={setCameraRef}>
          <TouchableOpacity
            onPress={takePhoto}
            style={styles.takePhotoButton}
            activeOpacity={0.75}
          >
            {/* <Feather name="camera" size={24} color="grey" fill="black" />
             */}
            <Ionicons name="camera" size={24} color="grey" />
          </TouchableOpacity>
        </Camera>
      )}
      {photo && (
        <>
          <Image source={{ uri: photo }} style={styles.camera} />
          <Button
            onPress={() => {
              setPhoto("");
            }}
            title="DELETE"
          />
        </>
      )}

      {/* )} */}
    </View>
  );
};
