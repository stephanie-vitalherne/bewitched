import React from "react";
import { View, Text, Pressable, Image } from "react-native";
import tw from "tailwind-rn";
import { useNavigation, useRoute } from "@react-navigation/core";

const Matched = () => {
  const navigation = useNavigation();
  const { params } = useRoute();

  const { loggedInProfile, userSwipe } = params;

  return (
    <View style={[tw("h-full bg-purple-500 pt-20"), { opacity: 0.89 }]}>
      <View style={tw("justify-center px-10 pt-20")}>
        <Image source={{ uri: "https://links.papareact.com/mg9" }} />
      </View>

      <Text style={tw("text-white text-center mt-5")}>
        You and {userSwipe.displayName} have liked each other
      </Text>

      <View style={tw("flex-row justify-evenly mt-5")}>
        <Image
          style={tw("h-32 w-32 rounded-full")}
          source={{ uri: loggedInProfile.photoURL }}
        />
        <Image
          style={tw("h-32 w-32 rounded-full")}
          source={{ uri: userSwipe.photoURL }}
        />
      </View>

      <Pressable
        style={tw("bg-white m-5 px-10 py-8 rounded-full mt-20")}
        onPress={() => {
          navigation.goBack();
          navigation.navigate("Chat");
        }}
      >
        <Text style={tw("text-center")}>Send a Message</Text>
      </Pressable>
    </View>
  );
};

export default Matched;
