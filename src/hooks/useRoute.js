import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { LoginScreen } from "../components/Screens/LoginScreen";
import { CreateScreen } from "../components/Screens/MainScreen/CreateScreen";
import { PostsScreen } from "../components/Screens/MainScreen/PostsScreen";
import { ProfileScreen } from "../components/Screens/MainScreen/ProfileScreen";
import { RegistrationScreen } from "../components/Screens/RegistrationScreen";

const AuthStack = createStackNavigator();
const MainTab = createBottomTabNavigator();
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
  return (
    <MainTab.Navigator>
      <MainTab.Screen name="Posts" component={PostsScreen} />
      <MainTab.Screen name="Create" component={CreateScreen} />
      <MainTab.Screen name="Profile" component={ProfileScreen} />
    </MainTab.Navigator>
  );
};
export default useRoute;
