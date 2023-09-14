import { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  TextInput,
} from "react-native";
import { Keyboard, TouchableWithoutFeedback } from "react-native";
import { Ionicons, AntDesign } from "@expo/vector-icons";

import styles from "../../../styles/CommentsScreenStyles";

const CommentsScreen = ({ navigation, route }) => {
  const [isShownKeyboard, setIsShownKeyboard] = useState(false);

  const { photoUrl, postId } = route.params;
  const windowWidth = Dimensions.get("window").width;
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

  const handleContainerTouch = (e) => {
    Keyboard.dismiss();
    setIsShownKeyboard(false);
  };

  return (
    <TouchableWithoutFeedback onPress={handleContainerTouch}>
      <View style={styles.container}>
        <Image
          source={{ uri: photoUrl }}
          style={{
            ...styles.postImage,
            width: windowWidth - 32,
          }}
        />
        <View>
          <TextInput
            style={{ ...styles.commentInput, width: windowWidth - 32 }}
            placeholder="Коментувати..."
          ></TextInput>
          <TouchableOpacity activeOpacity={0.8} style={styles.sendIcon}>
            <AntDesign name="arrowup" size={24} color="#ffffff" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CommentsScreen;
