import React from "react";
import { View, Pressable, Image } from "react-native";
import tw from "tailwind-rn";
import { Ionicons } from "@expo/vector-icons";

const Header = ({ onPressLogout, onPressChat, onPressModal, photoURL }) => {
  return (
    <View style={tw("flex-row items-center justify-between px-6")}>
      <Pressable onPress={onPressLogout}>
        <Image
          source={{ uri: photoURL }}
          style={tw("h-10 w-10 rounded-full")}
        />
      </Pressable>
      <Pressable onPress={onPressModal}>
        <Image style={tw("w-14 h-14")} source={require("../assets/eye.png")} />
      </Pressable>
      <Pressable onPress={onPressChat}>
        <Ionicons name="chatbubbles-sharp" size={30} color="#ff9700" />
      </Pressable>
    </View>
  );
};

export default Header;
