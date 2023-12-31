import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Image,
  Dimensions,
} from "react-native";
import {
  collection,
  query,
  where,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import { Ionicons, Feather } from "@expo/vector-icons";

import styles from "../../../styles/ProfileScreenStyle";
import Logout from "../../../img/svg/logout.svg";
import { db } from "../../../firebase/config";
import { getUser } from "../../../selectors/selectors";
import { authSignOut } from "../../../redux/auth/authOperations";

export const ProfileScreen = ({ navigation }) => {
  const { nickname, userId } = useSelector(getUser);
  const [allUsersPosts, setAllUsersPosts] = useState(null);
  const windowWidth = Dimensions.get("window").width;

  const dispatch = useDispatch();

  const getUsersPosts = async () => {
    const ref = query(collection(db, "posts"), where("userId", "==", userId));
    await onSnapshot(ref, (data) => {
      setAllUsersPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
  };

  useEffect(() => {
    getUsersPosts();
  }, []);

  const signOut = () => {
    dispatch(authSignOut());
    console.log("Sign out");
  };

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
            }}
          ></View>
          <View style={styles.logout}>
            <TouchableOpacity activeOpacity={0.8} onPress={signOut}>
              <Logout />
            </TouchableOpacity>
          </View>
          <Text style={styles.name}>{nickname}</Text>
          <SafeAreaView>
            <FlatList
              data={allUsersPosts}
              renderItem={({ item }) => (
                <View style={styles.postWrapper}>
                  <Image
                    source={{ uri: item.photoUrl }}
                    style={{
                      ...styles.postImage,
                      width: windowWidth - 32,
                    }}
                  />
                  <Text style={styles.postTitle}>{item.title}</Text>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <TouchableOpacity
                      style={styles.commentsWrapper}
                      activeOpacity={0.7}
                      onPress={() =>
                        navigation.navigate("Comments", {
                          photoUrl: item.photoUrl,
                          photoId: item.id,
                        })
                      }
                    >
                      <Ionicons
                        name="chatbubble-outline"
                        size={24}
                        color="#BDBDBD"
                        flip="horizontal"
                        style={{
                          transform: [{ rotateY: "180deg" }],
                          marginRight: 6,
                        }}
                      />
                      <Text style={styles.comments}>0</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.locationWrapper}
                      onPress={() =>
                        navigation.navigate("Map", {
                          latitude: item.latitude,
                          longitude: item.longitude,
                        })
                      }
                    >
                      <Feather name="map-pin" size={24} color="#BDBDBD" />
                      <Text style={styles.location}>{item.locationTitle}</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
              keyExtractor={(item) => item.id}
            />
          </SafeAreaView>
        </View>
      </ImageBackground>
    </View>
  );
};
