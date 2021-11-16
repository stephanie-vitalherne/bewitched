import React from "react";
import { View, Pressable } from "react-native";
import tw from "tailwind-rn";
import { AntDesign, Entypo } from "@expo/vector-icons";

const Buttons = ({ onPressLeft, onPressRight }) => {
  return (
    <View style={tw("flex flex-row justify-evenly")}>
      <Pressable
        onPress={onPressLeft}
        style={tw(
          "items-center justify-center rounded-full w-16 h-16 bg-red-200"
        )}
      >
        <Entypo name="cross" size={24} color="#BB0A1E" />
      </Pressable>
      <Pressable
        onPress={onPressRight}
        style={tw(
          "items-center justify-center rounded-full w-16 h-16 bg-green-200"
        )}
      >
        <AntDesign name="heart" size={24} color="green" />
      </Pressable>
    </View>
  );
};

export default Buttons;
