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
import { useSelector } from "react-redux";
import { getUser } from "../../../selectors/selectors";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase/config";

const CommentsScreen = ({ navigation, route }) => {
  const [isShownKeyboard, setIsShownKeyboard] = useState(false);
  const [comment, setComment] = useState("");
  const user = useSelector(getUser);

  const { photoUrl, photoId } = route.params;
  const windowWidth = Dimensions.get("window").width;

  const addComment = async () => {
    const commentRef = collection(db, "posts", photoId, "comments");
    console.log("aaaaa", photoId, comment);
    await addDoc(commentRef, {
      comment: comment,
      user: user.nickname,
    })
      .then((data) => {
        console.log(data);
        console.log("add coment");
      })
      .catch((err) => console.log(err));
  };

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
            onChangeText={setComment}
            value={comment}
          ></TextInput>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.sendIcon}
            onPress={addComment}
          >
            <AntDesign name="arrowup" size={24} color="#ffffff" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CommentsScreen;
