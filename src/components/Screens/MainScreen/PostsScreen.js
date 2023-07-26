import React from "react";
import { Ionicons, Feather } from "@expo/vector-icons";

import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  StatusBar,
  SafeAreaView,
  Image,
  Dimensions,
} from "react-native";
import styles from "../../../styles/PostsStyles";
import { TouchableOpacity } from "react-native";
export const PostsScreen = ({ navigation }) => {
  const windowWidth = Dimensions.get("window").width;
  return (
    // <SafeAreaView>
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View>
        <View style={styles.userPhotoWrapper}>
          <Image style={styles.userPhoto} />
          <View style={styles.userInfoWrapper}>
            <Text style={styles.userName}>Natali Romanova</Text>
            <Text style={styles.userEmail}>email@example.com</Text>
          </View>
        </View>
        <View>
          <Image
            source={require("../../../img/e6009416f2009943b9cd5d7f02695269.jpg")}
            style={{
              ...styles.postImage,
              width: windowWidth - 32,
              // transform: [{ rotateY: "180deg" }],
              // transform: "rotate(180deg)",
            }}
          />
          <Text style={styles.postTitle}>Ліс</Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <TouchableOpacity
              style={styles.commentsWrapper}
              activeOpacity={0.7}
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
              <Text style={styles.likes}>0</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.locationWrapper}>
              <Feather name="map-pin" size={24} color="#BDBDBD" />
              <Text style={styles.location}>
                Ivano-Frankivs'k Region, Ukraine
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
    // </SafeAreaView>
  );
};
