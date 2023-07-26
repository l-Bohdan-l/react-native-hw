import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { AntDesign } from "@expo/vector-icons";

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

  const handleLogout = () => {
    // navigation.navigate("Login");
  };
  return (
    <MainTab.Navigator screenOptions={{ tabBarShowLabel: false }}>
      <MainTab.Screen
        options={{
          headerRight: () => (
            <TouchableOpacity
              onPress={handleLogout}
              style={styles.logout}
              activeOpacity={0.8}
            >
              <Logout />
            </TouchableOpacity>
          ),
          title: "Публікації",
          headerTitleStyle: styles.mainTitle,
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
                <PostsIcon width={24} height={24} fill={color} />
              </View>
            );
          },
        }}
        name="Posts"
        component={PostsScreen}
      />
      <MainTab.Screen
        options={{
          title: "Створити публікацію",
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
                <AntDesign name="plus" size={24} color={color} />
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
                <UserIcon width={24} height={24} fill={color} />
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
export default useRoute;
