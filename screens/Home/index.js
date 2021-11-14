import React from "react";
import { View, Button, SafeAreaView, Pressable, Image } from "react-native";
import { useNavigation } from "@react-navigation/core";
import useAuth from "../../hooks/useAuth";
import tw from "tailwind-rn";
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
import Swiper from "react-native-deck-swiper";

const Home = () => {
  const navigation = useNavigation();
  const { user, logout } = useAuth();
  console.log(user);

  return (
    <SafeAreaView style={tw("bg-gray-700")}>
      {/* Header */}
      <View style={tw("flex-row items-center justify-between px-6")}>
        <Pressable onPress={logout}>
          <Image
            source={{ uri: user.photoURL }}
            style={tw("h-10 w-10 rounded-full")}
          />
        </Pressable>
        <Pressable>
          <Image
            source={require("../../assets/eye.png")}
            style={tw("w-14 h-14")}
          />
        </Pressable>
        <Pressable onPress={() => navigation.navigate("Chat")}>
          <Ionicons name="chatbubbles-sharp" size={30} color="#ff9700" />
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default Home;
