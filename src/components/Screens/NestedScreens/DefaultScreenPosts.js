import React, { useEffect, useState } from "react";
import { collection, doc, onSnapshot } from "firebase/firestore";
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
import { db } from "../../../firebase/config";

export const DefaultScreenPosts = ({ navigation, route }) => {
  const [posts, setPosts] = useState([]);
  const windowWidth = Dimensions.get("window").width;

  const getAllPosts = async () => {
    const allPosts = await onSnapshot(collection(db, "posts"), (data) => {
      setPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));   
    });
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View>
        <View>
          <FlatList
            data={posts}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (              
              <View style={{ marginBottom: 20 }}>
                <View style={styles.userPhotoWrapper}>
                  <Image style={styles.userPhoto} />
                  <View style={styles.userInfoWrapper}>
                    <Text style={styles.userName}>{item.nickname}</Text>                   
                  </View>
                </View>
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
          />
        </View>
      </View>
    </View>
  );
};
