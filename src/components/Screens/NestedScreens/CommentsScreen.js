import { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  TextInput,
  SafeAreaView,
  ScrollView,
  FlatList,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
} from "react-native";
import { Ionicons, AntDesign } from "@expo/vector-icons";

import styles from "../../../styles/CommentsScreenStyles";
import { useSelector } from "react-redux";
import { getUser } from "../../../selectors/selectors";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  orderBy,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../../firebase/config";

const CommentsScreen = ({ navigation, route }) => {
  const [isShownKeyboard, setIsShownKeyboard] = useState(false);
  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState([]);
  const [reverseComments, setReverseComments] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector(getUser);

  const { photoUrl, photoId } = route.params;
  const windowWidth = Dimensions.get("window").width;

  const addComment = async () => {
    if (!comment) {
      alert("Please enter a comment");
      return;
    }
    const commentRef = collection(db, "posts", photoId, "comments");
    const currentTime = Date.now();

    await addDoc(commentRef, {
      comment: comment,
      user: user.nickname,
      time: currentTime,
    })
      .then(() => {
        setIsLoading(true);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
    setComment("");
  };

  const getAllComments = async () => {
    const commentRef = collection(db, "posts", photoId, "comments");
    await onSnapshot(commentRef, (data) => {
      const res = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setAllComments(res);
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

  useEffect(() => {
    if (allComments) {
      setReverseComments(
        allComments.sort((a, b) => {
          if (a.time < b.time) {
            return 1;
          }
          if (a.time > b.time) {
            return -1;
          }
          // a должно быть равным b
          return 0;
        })
      );
      return;
    }
  }, [allComments]);

  const handleContainerTouch = (e) => {
    Keyboard.dismiss();
    setIsShownKeyboard(false);
  };

  console.log("allComments", allComments);
  console.log("user", user);
  // const a = new Date('milsec').toString();
  console.log("reverse", reverseComments);
  //1695223691516 1695223471255 1695223682433
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#fff",
        // justifyContent: isShownKeyboard ? "flex-start" : "space-between",
        alignItems: "center",
        paddingTop: 32,
        paddingLeft: 16,
        paddingRight: 16,
        paddingBottom: 26,
      }}
    >
      <TouchableWithoutFeedback onPress={handleContainerTouch}>
        <View
          style={{
            flex: 1,
            justifyContent: isShownKeyboard ? "flex-start" : "space-between",
          }}
        >
          <Image
            source={{ uri: photoUrl }}
            style={{
              ...styles.postImage,
              width: windowWidth - 32,
            }}
          />
          <View
            style={{
              flex: 1,
              // flexGrow: 0,
            }}
          >
            <FlatList
              style={
                {
                  // flexGrow: 0, height: 10
                }
              }
              data={reverseComments}
              inverted={true}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View
                  style={{
                    ...styles.commentBlockWrapper,
                    flexDirection:
                      item.user === user.nickname ? "row-reverse" : "row",
                  }}
                >
                  <View
                    style={{
                      ...styles.userPhotoWrapper,
                      marginRight: item.user === user.nickname ? 0 : 8,
                      marginLeft: item.user === user.nickname ? 8 : 0,
                    }}
                  >
                    <Image
                      style={{
                        ...styles.userPhoto,
                      }}
                    />
                  </View>
                  <View
                    style={{
                      ...styles.commentWrapper,
                      width: windowWidth - 68,
                    }}
                  >
                    <Text style={styles.userName}>{item.user}</Text>
                    <Text>{item.comment}</Text>
                    <Text
                      style={{
                        ...styles.commentTime,
                        textAlign:
                          item.user === user.nickname ? "right" : "left",
                      }}
                    >
                      {new Date(item.time).getDate()}{" "}
                      {new Intl.DateTimeFormat("en-US", {
                        month: "long",
                      }).format(item.time)}
                      {", "}
                      {new Date(item.time).getFullYear()}
                      {" | "}
                      {new Date(item.time).getHours()}
                      {":"}
                      {new Date(item.time).getMinutes()}
                    </Text>
                  </View>
                </View>
              )}
            />
          </View>
          <KeyboardAvoidingView
            // style={{ flex: 1 }}
            behavior={Platform.OS == "ios" ? "padding" : "height"}
          >
            <View>
              <TextInput
                style={{
                  ...styles.commentInput,
                  width: windowWidth - 32,
                  marginBottom: isShownKeyboard ? 100 : 0,
                  // position: "absolute",
                  // bottom: 0,
                }}
                placeholder="Коментувати..."
                onChangeText={setComment}
                value={comment}
                onFocus={() => {
                  setIsShownKeyboard(true);
                }}
              ></TextInput>
              <TouchableOpacity
                activeOpacity={0.8}
                style={{
                  ...styles.sendIcon,
                  backgroundColor: isLoading ? "grey" : "#FF6C00",
                }}
                onPress={addComment}
                disabled={isLoading ? true : false}
              >
                <AntDesign name="arrowup" size={24} color="#ffffff" />
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default CommentsScreen;

//  return (
//    <TouchableWithoutFeedback onPress={handleContainerTouch}>
//      <View style={styles.container}>
//        <Image
//          source={{ uri: photoUrl }}
//          style={{
//            ...styles.postImage,
//            width: windowWidth - 32,
//          }}
//        />
//        <SafeAreaView style={styles.container}>
//          <FlatList
//            data={allComments}
//            renderItem={({ item }) => (
//              <View
//                style={{
//                  ...styles.commentBlockWrapper,
//                  flexDirection:
//                    item.user === user.nickname ? "row-reverse" : "row",
//                }}
//              >
//                <View
//                  style={{
//                    ...styles.userPhotoWrapper,
//                    marginRight: item.user === user.nickname ? 0 : 8,
//                    marginLeft: item.user === user.nickname ? 8 : 0,
//                  }}
//                >
//                  <Image
//                    style={{
//                      ...styles.userPhoto,
//                    }}
//                  />
//                </View>
//                <View
//                  style={{
//                    ...styles.commentWrapper,
//                    width: windowWidth - 68,
//                  }}
//                >
//                  <Text style={styles.userName}>{item.user}</Text>
//                  <Text>{item.comment}</Text>
//                  <Text style={styles.commentTime}>
//                    {new Date(item.time).getDate()}{" "}
//                    {new Intl.DateTimeFormat("en-US", {
//                      month: "long",
//                    }).format(item.time)}
//                    {", "}
//                    {new Date(item.time).getFullYear()}
//                    {" | "}
//                    {new Date(item.time).getHours()}
//                    {":"}
//                    {new Date(item.time).getMinutes()}
//                  </Text>
//                </View>
//              </View>
//            )}
//            keyExtractor={(item) => item.id}
//          />
//        </SafeAreaView>
//        <View>
//          <TextInput
//            style={{ ...styles.commentInput, width: windowWidth - 32 }}
//            placeholder="Коментувати..."
//            onChangeText={setComment}
//            value={comment}
//            onFocus={() => {
//              setIsShownKeyboard(true);
//            }}
//          ></TextInput>
//          <TouchableOpacity
//            activeOpacity={0.8}
//            style={styles.sendIcon}
//            onPress={addComment}
//          >
//            <AntDesign name="arrowup" size={24} color="#ffffff" />
//          </TouchableOpacity>
//        </View>
//      </View>
//    </TouchableWithoutFeedback>
//  );
