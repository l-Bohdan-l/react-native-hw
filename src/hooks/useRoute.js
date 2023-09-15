import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { AntDesign, Ionicons } from "@expo/vector-icons";

import { View, Text, TouchableOpacity } from "react-native";
import { useContext } from "react";

import { LoginScreen } from "../components/Screens/LoginScreen";
import { CreateScreen } from "../components/Screens/MainScreen/CreateScreen";
import { PostsScreen } from "../components/Screens/MainScreen/PostsScreen";
import { ProfileScreen } from "../components/Screens/MainScreen/ProfileScreen";
import { RegistrationScreen } from "../components/Screens/RegistrationScreen";

import styles from "../styles/HeaderStyles";

import AuthContext from "../../src/hooks/AuthContext";

import PostsIcon from "../img/svg/grid.svg";
import AddIcon from "../img/svg/addIcon.svg";
import UserIcon from "../img/svg/user.svg";
import Logout from "../img/svg/logout.svg";
import { DefaultScreenPosts } from "../components/Screens/NestedScreens/DefaultScreenPosts";
import { useDispatch } from "react-redux";
import { authSignOut } from "../redux/auth/authOperations";

const AuthStack = createStackNavigator();
const MainTab = createBottomTabNavigator();
// const { isAuthContext, setIsAuth } = useContext(AuthContext);
const useRoute = (isAuth) => {
  if (!isAuth) {
    return (
      <AuthStack.Navigator initialRouteName="Login">
        <AuthStack.Screen
          name="Register"
          component={RegistrationScreen}
          options={{ headerShown: false }}
        />
        <AuthStack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
      </AuthStack.Navigator>
    );
  }
  return <PostsScreen />;
};
export default useRoute;

export const MainTabScreens = () => {
  const dispatch = useDispatch();

  const signOut = () => {
    dispatch(authSignOut());
    console.log("Sign out");
  };
  return (
    <MainTab.Navigator
      screenOptions={{ tabBarShowLabel: false, statusBarStyle: "dark" }}
    >
      <MainTab.Screen
        options={{
          // headerRight: () => (
          //   <TouchableOpacity style={styles.logout} activeOpacity={0.8}>
          //     <Logout />
          //   </TouchableOpacity>
          // ),
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
          // headerShown: false,

          statusBarHidden: true,
          tabBarIcon: ({ focused, size, color }) => {
            return (
              <View
                style={{
                  // flex: 1,
                  width: 70,
                  height: 40,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 20,
                  backgroundColor: focused ? "#FF6C00" : "none",
                  // boxSizing: "border-box",
                }}
              >
                <PostsIcon
                  width={24}
                  height={24}
                  fill={focused ? "#fff" : color}
                />
              </View>
            );
          },
        }}
        name="Posts"
        // component={PostsScreen}
        component={DefaultScreenPosts}
      />
      <MainTab.Screen
        backBehaviour="history"
        options={{
          title: "Створити публікацію",
          unmountOnBlur: true,
          tabBarStyle: { display: "none" },
          // headerShown: false,
          // headerLeft: () => (
          //   <TouchableOpacity style={styles.goBack} activeOpacity={0.8}>
          //     <Ionicons name="arrow-back" size={24} color="black" />
          //   </TouchableOpacity>
          // ),
          tabBarIcon: ({ focused, size, color }) => {
            return (
              <View
                style={{
                  // flex: 1,
                  width: 70,
                  height: 40,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 20,
                  backgroundColor: focused ? "#FF6C00" : "none",
                  // boxSizing: "border-box",
                }}
              >
                {/* <AddIcon
                  width={70}
                  height={40}
                  fill={focused ? "#FF6C00" : "#FF6C00"}
                /> */}
                <AntDesign
                  name="plus"
                  size={24}
                  color={focused ? "#fff" : color}
                />
              </View>
            );
          },
        }}
        name="Create"
        component={CreateScreen}
      />
      <MainTab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, size, color }) => {
            return (
              <View
                style={{
                  // flex: 1,
                  width: 70,
                  height: 40,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 20,
                  backgroundColor: focused ? "#FF6C00" : "none",
                  // boxSizing: "border-box",
                }}
              >
                <UserIcon
                  width={24}
                  height={24}
                  fill={focused ? "#fff" : color}
                />
              </View>
            );
          },
        }}
        name="Profile"
        component={ProfileScreen}
      />
    </MainTab.Navigator>
  );
};
