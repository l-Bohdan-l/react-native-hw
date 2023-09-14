import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";

import styles from "../../../styles/DefaultScreenPostsStyles";
import { DefaultScreenPosts } from "../NestedScreens/DefaultScreenPosts";
import CommentsScreen from "../NestedScreens/CommentsScreen";
import MapScreen from "../NestedScreens/MapScreen";
import Logout from "../../../img/svg/logout.svg";
import { Ionicons } from "@expo/vector-icons";
import { authSignOut } from "../../../redux/auth/authOperations";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MainTabScreens } from "../../../hooks/useRoute";

const NestedScreen = createStackNavigator();
const TabScreen = createBottomTabNavigator();

// const

export const PostsScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();

  const signOut = () => {
    dispatch(authSignOut());
    console.log("Sign out");
  };
  return (
    <NestedScreen.Navigator>
      <NestedScreen.Screen
        // name="DefaultScreen"
        // component={DefaultScreenPosts}
        component={MainTabScreens}
        name="Posts"
        options={{
          headerShown: false,
          title: "Публікації",
          headerTitleStyle: styles.mainTitle,
          headerRight: () => (
            <TouchableOpacity
              style={styles.logout}
              activeOpacity={0.8}
              onPress={signOut}
            >
              <Logout />
            </TouchableOpacity>
          ),
        }}
      />
      <NestedScreen.Screen
        name="Comments"
        component={CommentsScreen}
        options={{
          title: "Коментарі",
          headerTitleStyle: styles.mainTitle,
          // tabBarStyle: { display: "none" },
          tabBarVisible: false,
          // headerBackButtonMenuEnabled: false,
          // headerBackTitleVisible: false,
          headerBackImageSource: () => (
            <Ionicons name="arrow-back" size={24} color="black" />
          ),
        }}
      />
      <NestedScreen.Screen
        name="Map"
        component={MapScreen}
        options={{
          title: "Карта",
          headerBackImageSource: () => (
            <Ionicons name="arrow-back" size={24} color="black" />
          ),
          headerTitleStyle: styles.mainTitle,
        }}
      />
    </NestedScreen.Navigator>
  );
};
