import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { StyleSheet, View, Text, ImageBackground } from "react-native";
import { ProfileScreen } from "./ProfileScreen";
const CreateTab = createBottomTabNavigator();
export const CreateScreen = ({ navigation }) => {
  return (
    <View>
      <Text>CreateScreen</Text>
      {/* <CreateTab.Navigator>
        <CreateTab.Screen name="Profile" component={ProfileScreen} />
      </CreateTab.Navigator> */}
    </View>
  );
};
