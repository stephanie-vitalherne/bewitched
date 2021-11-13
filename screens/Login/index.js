import React, { useLayoutEffect } from "react";
import { View, Image, Pressable, Text } from "react-native";
import useAuth from "../../hooks/useAuth";
import { useNavigation } from "@react-navigation/core";
import { LinearGradient } from "expo-linear-gradient";
import tw from "tailwind-rn";

const Login = () => {
  const { signInWithGoogle } = useAuth();
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <View style={tw("flex-1")}>
      <LinearGradient
        style={tw("absolute left-0 right-0 top-0 h-full")}
        end={{ x: 0.65, y: 1.2 }}
        locations={[0.01, 0.28, 0.87]}
        colors={["rgba(255,151,0,0.8)", "rgba(49,4,103,1)", "rgba(28,6,54,1)"]}
      />
      <View style={tw("w-full h-full justify-center items-center")}>
        <Image
          source={require("../../assets/magic-ball.png")}
          style={tw("w-72 h-72")}
        />
      </View>
      <Pressable
        style={[
          tw("absolute bottom-40 w-52 bg-gray-700 p-4 rounded-2xl"),
          { marginHorizontal: "25%" },
        ]}
        onPress={signInWithGoogle}
      >
        <Text style={tw("text-center text-white font-semibold")}>
          Sign In & Get to Swiping
        </Text>
      </Pressable>
    </View>
  );
};

export default Login;
