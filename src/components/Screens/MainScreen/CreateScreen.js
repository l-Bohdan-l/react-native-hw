import React, { useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Camera, CameraType } from "expo-camera";
import * as Location from "expo-location";
import { useIsFocused } from "@react-navigation/native";

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
  const [location, setLocation] = useState({
    latitude: 0,
    longitude: 0,
  });
  const initialState = {
    title: "",
    // location: "",
    locationTitle: "",
  };
  const [state, setState] = useState(initialState);
  // console.log("permission", permission);
  const isFocused = useIsFocused();

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

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (!status) {
        // status are still loading
        return <View />;
      }
      if (status !== "granted") {
        return (
          <View style={styles.container}>
            <Text style={{ textAlign: "center" }}>
              We need your permission to show the map
            </Text>
            <Button
              onPress={Location.requestForegroundPermissionsAsync()}
              title="grant permission"
            />
          </View>
        );
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    })();
  }, []);

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
      let location = await Location.getCurrentPositionAsync({});
      console.log("location take photo", location);
      setLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    }
  };
  console.log("location create screen", location);

  const postPhoto = () => {
    setPhoto("");
    setState(initialState);
    if (!photo || state.title === "" || state.locationTitle === "") {
      return Alert.alert("Помилка", "Заповніть всі поля");
    }
    navigation.navigate("DefaultScreen", {
      photo,
      title: state.title,
      locationTitle: state.locationTitle,
      latitude: location.latitude,
      longitude: location.longitude,
    });
  };

  const deletePhoto = () => {
    setPhoto("");
    setState(initialState);
  };
  const handleTitleChange = (value) => {
    setState((prevState) => ({ ...prevState, title: value }));
  };
  const handleLocationTitleChange = (value) => {
    setState((prevState) => ({ ...prevState, locationTitle: value }));
  };

  const handleContainerTouch = (e) => {
    Keyboard.dismiss();
    setIsShownKeyboard(false);
  };
  return (
    <TouchableWithoutFeedback onPress={handleContainerTouch}>
      <View style={styles.container}>
        {!photo && isFocused && (
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
              value={state.locationTitle}
              onChangeText={handleLocationTitleChange}
              style={styles.pictureInput}
              placeholder="Місцевість..."
              placeholderTextColor="#BDBDBD"
            ></TextInput>
          </View>
          <TouchableOpacity
            disabled={
              !photo || state.title === "" || state.locationTitle === ""
            }
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
