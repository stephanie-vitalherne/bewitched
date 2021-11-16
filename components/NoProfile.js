import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import tw from "tailwind-rn";

const NoProfile = () => {
  return (
    <View
      style={[
        tw("relative bg-white h-3/4 rounded-xl justify-center items-center"),
        styles.shadow,
      ]}
    >
      <Text style={tw("font-bold pb-5")}>No more profiles</Text>
      <Image
        style={tw("h-20 w-20")}
        source={{ uri: "https://links.papareact.com/6gb" }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
});

export default NoProfile;
