import { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  TextInput,
  SafeAreaView,
} from "react-native";
import { Keyboard, TouchableWithoutFeedback } from "react-native";
import { Ionicons, AntDesign } from "@expo/vector-icons";

import styles from "../../../styles/CommentsScreenStyles";
import { useSelector } from "react-redux";
import { getUser } from "../../../selectors/selectors";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../../firebase/config";
import { FlatList } from "react-native";

const CommentsScreen = ({ navigation, route }) => {
  const [isShownKeyboard, setIsShownKeyboard] = useState(false);
  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState([]);
  const user = useSelector(getUser);

  const { photoUrl, photoId } = route.params;
  const windowWidth = Dimensions.get("window").width;

  const addComment = async () => {
    const commentRef = collection(db, "posts", photoId, "comments");

    await addDoc(commentRef, {
      comment: comment,
      user: user.nickname,
    }).catch((err) => console.log(err));
    setComment("");
  };

  const getAllComments = async () => {
    const commentRef = collection(db, "posts", photoId, "comments");
    await onSnapshot(commentRef, (data) => {
      setAllComments(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      console.log("Current data: ", data.docs);
    });
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

  useEffect(() => {
    getAllComments();
  }, []);

  const handleContainerTouch = (e) => {
    Keyboard.dismiss();
    setIsShownKeyboard(false);
  };

  console.log(allComments);

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
        <SafeAreaView style={styles.container}>
          <FlatList
            data={allComments}
            renderItem={({ item }) => (
              <View style={styles.commentBlockWrapper}>
                <View style={styles.userPhotoWrapper}>
                  <Image style={styles.userPhoto} />
                </View>
                <View style={styles.commentWrapper}>
                  <Text>{item.user}</Text>
                  <Text>{item.comment}</Text>
                </View>
              </View>
            )}
            keyExtractor={(item) => item.id}
          />
        </SafeAreaView>
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
