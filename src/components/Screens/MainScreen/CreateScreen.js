import React, { useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Camera, CameraType } from "expo-camera";
import * as Location from "expo-location";
import { useIsFocused } from "@react-navigation/native";
import { Feather, Ionicons } from "@expo/vector-icons";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
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
import { useSelector } from "react-redux";

import { ProfileScreen } from "./ProfileScreen";
import styles from "../../../styles/CreateScreenStyles";
import TrashCan from "../../../img/svg/trash-2.svg";
import { db, storage } from "../../../firebase/config";
import { getUser } from "../../../selectors/selectors";

export const CreateScreen = ({ navigation }) => {
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [cameraRef, setCameraRef] = useState(null);
  const [type, setType] = useState(CameraType.back);
  const [photo, setPhoto] = useState("");
  const [isShownKeyboard, setIsShownKeyboard] = useState(false);
  const [photoUrl, setPhotoUrl] = useState("");
  const [location, setLocation] = useState({
    latitude: 0,
    longitude: 0,
  });
  const initialState = {
    title: "",
    locationTitle: "",
  };
  const [state, setState] = useState(initialState);
  const isFocused = useIsFocused();
  const { nickname, userId } = useSelector(getUser);

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
      setPhoto(uri);
      let location = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    }
  };

  const postPhoto = async () => {
    setPhoto("");
    setState(initialState);
    if (!photo || state.title === "" || state.locationTitle === "") {
      return Alert.alert("Помилка", "Заповніть всі поля");
    }
    await uploadPostOnServer();
  };

  const uploadPostOnServer = async () => {
    const photoUrl = await sendPhotoOnServer();

    await addDoc(collection(db, "posts"), {
      photoUrl: photoUrl,
      title: state.title,
      locationTitle: state.locationTitle,
      latitude: location.latitude,
      longitude: location.longitude,
      nickname,
      userId,
    });
    navigation.navigate("Posts");
  };

  const sendPhotoOnServer = async () => {
    const takenPhoto = await fetch(photo);
    const file = await takenPhoto.blob();
    const uniqueId = Date.now().toString();
    const photoRef = ref(storage, `images/${uniqueId}`);
    let photoUrl;
    const data = await uploadBytes(photoRef, file)
      .then((snapshot) => {
        console.log("Uploaded a blob or file!");
      })
      .catch((error) => {
        console.log("error", error);
      });

    const proceedPhoto = await getDownloadURL(photoRef)
      .then((downloadURL) => {
        photoUrl = downloadURL;
      })
      .catch((error) => {
        switch (error.code) {
          case "storage/object-not-found":
            console.log("File doesn't exist");
            break;
          case "storage/unauthorized":
            console.log("User doesn't have permission to access the object");
            break;
          case "storage/canceled":
            console.log("User canceled the upload");
            break;
          case "storage/unknown":
            console.log("Unknown error occurred, inspect the server response");
            break;
        }
      });
    return photoUrl;
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
