import React, { useEffect, useState } from "react";
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
  TouchableOpacity,
  FlatList,
} from "react-native";
import styles from "../../../styles/PostsStyles";

export const PostsScreen = ({ navigation, route }) => {
  console.log("route", route.params);
  const [posts, setPosts] = useState([]);
  const windowWidth = Dimensions.get("window").width;

  useEffect(() => {
    if (route.params) {
      console.log("useEffect", route.params);
      setPosts((prevState) => [...prevState, route.params]);
    }
  }, [route.params]);
  console.log("posts", posts);
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
          <FlatList
            data={posts}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <SafeAreaView style={{ marginBottom: 32 }}>
                <Image
                  source={{ uri: item.photo }}
                  style={{
                    ...styles.postImage,
                    width: windowWidth - 32,
                    // transform: [{ rotateY: "180deg" }],
                    // transform: "rotate(180deg)",
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
                    <Text style={styles.location}>{item.location}</Text>
                  </TouchableOpacity>
                </View>
              </SafeAreaView>
            )}
          />
          {/* <Image
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
          </View> */}
        </View>
      </View>
    </View>
    // </SafeAreaView>
  );
};
