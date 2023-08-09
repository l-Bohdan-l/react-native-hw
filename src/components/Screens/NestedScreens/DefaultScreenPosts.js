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
import styles from "../../../styles/DefaultScreenPostsStyles";

export const DefaultScreenPosts = ({ navigation, route }) => {
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
                    onPress={() => navigation.navigate("Comments")}
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
              </SafeAreaView>
            )}
          />
        </View>
      </View>
    </View>
  );
};
