import { useEffect } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import styles from "../../../styles/CommentsScreenStyles";
const CommentsScreen = ({ navigation, route }) => {
  const { photoUrl, postId } = route.params;

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

  return (
    <View style={styles.container}>
      <Image source={{ uri: photoUrl }} />
    </View>
  );
};

export default CommentsScreen;
