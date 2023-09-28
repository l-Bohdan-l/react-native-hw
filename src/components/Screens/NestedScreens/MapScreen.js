import { Text, TouchableOpacity, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";
import { useEffect } from "react";
import styles from "../../../styles/MapScreenStyles";

const MapScreen = ({ navigation, route }) => {
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
      <MapView
        style={styles.container}
        region={{
          latitude: route.params.latitude,
          longitude: route.params.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={{
            latitude: route.params.latitude,
            longitude: route.params.longitude,
          }}
        />
      </MapView>
    </View>
  );
};

export default MapScreen;
