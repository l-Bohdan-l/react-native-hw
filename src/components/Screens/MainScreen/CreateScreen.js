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
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import { ProfileScreen } from "./ProfileScreen";
import styles from "../../../styles/CreateScreenStyles";
import TrashCan from "../../../img/svg/trash-2.svg";

export const CreateScreen = ({ navigation }) => {
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [cameraRef, setCameraRef] = useState(null);
  const [type, setType] = useState(CameraType.back);
  const [photo, setPhoto] = useState("");
  const [isShownKeyboard, setIsShownKeyboard] = useState(false);
  const initialState = {
    title: "",
    location: "",
  };
  const [state, setState] = useState(initialState);
  // console.log("permission", permission);

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ marginLeft: 16 }}
          activeOpacity={0.8}
        >
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
      ),
    });
  });

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
      // console.log("uri", uri);
      setPhoto(uri);
    }
  };

  const postPhoto = () => {
    setPhoto("");
    setState(initialState);
    if (!photo || state.title === "" || state.location === "") {
      return Alert.alert("Помилка", "Заповніть всі поля");
    }
    navigation.navigate("Posts", {
      photo,
      title: state.title,
      location: state.location,
    });
  };

  const deletePhoto = () => {
    setPhoto("");
    setState(initialState);
  };
  const handleTitleChange = (value) => {
    setState((prevState) => ({ ...prevState, title: value }));
  };
  const handleLocationChange = (value) => {
    setState((prevState) => ({ ...prevState, location: value }));
  };

  const handleContainerTouch = (e) => {
    Keyboard.dismiss();
    setIsShownKeyboard(false);
  };
  return (
    <TouchableWithoutFeedback onPress={handleContainerTouch}>
      <View style={styles.container}>
        {!photo && (
          <>
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
            <TextInput style={styles.addPhotoTitle}>Завантажте фото</TextInput>
          </>
        )}
        {photo && (
          <>
            <Image source={{ uri: photo }} style={styles.camera} />
            <TextInput style={styles.addPhotoTitle}>Редагувати фото</TextInput>
          </>
        )}
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
        >
          <View style={styles.pictureInputContainer}>
            <TextInput
              onEndEditing={() => {
                setIsShownKeyboard(false);
              }}
              onFocus={() => {
                setIsShownKeyboard(true);
              }}
              value={state.title}
              onChangeText={handleTitleChange}
              style={styles.pictureInput}
              placeholder="Назва..."
            ></TextInput>
          </View>
          <View style={{ ...styles.pictureInputContainer, marginBottom: 32 }}>
            <Feather name="map-pin" size={24} color="#BDBDBD" />
            <TextInput
              onEndEditing={() => {
                setIsShownKeyboard(false);
              }}
              onFocus={() => {
                setIsShownKeyboard(true);
              }}
              value={state.location}
              onChangeText={handleLocationChange}
              style={styles.pictureInput}
              placeholder="Місцевість..."
              placeholderTextColor="#BDBDBD"
            ></TextInput>
          </View>
          <TouchableOpacity
            disabled={!photo || state.title === "" || state.location === ""}
            style={{
              ...styles.publishButton,
              backgroundColor: photo ? "#FF6C00" : "#F6F6F6",
            }}
            activeOpacity={0.8}
            onPress={postPhoto}
          >
            <Text
              style={{
                ...styles.BtnText,
                color: photo ? "#fff" : "#BDBDBD",
              }}
            >
              Опубліковати
            </Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
        <TouchableOpacity
          onPress={deletePhoto}
          style={styles.deleteButton}
          activeOpacity={0.8}
        >
          <TrashCan width={24} height={24} fill="#FF6C00" />
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};
