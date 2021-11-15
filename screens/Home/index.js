import React from "react";
import { View, Text, SafeAreaView, Pressable, Image } from "react-native";
import { useNavigation } from "@react-navigation/core";
import useAuth from "../../hooks/useAuth";
import tw from "tailwind-rn";
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
import Swiper from "react-native-deck-swiper";
import { DUMMY_DATA } from "../../data/dummy-data";
import { SwipeCard } from "../../components";

const Home = () => {
  const navigation = useNavigation();
  const { user, logout } = useAuth();
  console.log(user);

  return (
    <SafeAreaView style={tw("bg-gray-700 flex-1")}>
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
            style={tw("w-14 h-14")}
            source={require("../../assets/eye.png")}
          />
        </Pressable>
        <Pressable onPress={() => navigation.navigate("Chat")}>
          <Ionicons name="chatbubbles-sharp" size={30} color="#ff9700" />
        </Pressable>
      </View>

      {/* Swipe Container */}
      <View style={tw("flex-1 -mt-6")}>
        <Swiper
          stackSize={5}
          cardIndex={0}
          cards={DUMMY_DATA}
          animateCardOpacity
          verticalSwipe={false}
          containerStyle={{ backgroundColor: "transparent" }}
          onSwipedLeft={() => {
            console.log("Swipe Pass");
          }}
          onSwipedRight={() => {
            console.log("Swipe Match");
          }}
          overlayLabels={{
            left: {
              title: "BANISHED",
              style: {
                label: {
                  textAlign: "right",
                  color: "#BB0A1E",
                },
              },
            },
            right: {
              title: "BETROTHED",
              style: {
                label: {
                  color: "#69BB01",
                },
              },
            },
          }}
          renderCard={(card) => (
            <SwipeCard
              id={card.id}
              age={card.age}
              job={card.job}
              photoURL={card.photoURL}
              lastName={card.lastName}
              firstName={card.firstName}
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default Home;
