import React, { useRef } from "react";
import { View, SafeAreaView, Pressable, Image } from "react-native";
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
  const swipeRef = useRef();

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
          ref={swipeRef}
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
                  color: "green",
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

      {/* Buttons */}
      <View style={tw("flex flex-row justify-evenly")}>
        <Pressable
          onPress={() => swipeRef.current.swipeLeft()}
          style={tw(
            "items-center justify-center rounded-full w-16 h-16 bg-red-200"
          )}
        >
          <Entypo name="cross" size={24} color="#BB0A1E" />
        </Pressable>
        <Pressable
          onPress={() => swipeRef.current.swipeRight()}
          style={tw(
            "items-center justify-center rounded-full w-16 h-16 bg-green-200"
          )}
        >
          <AntDesign name="heart" size={24} color="green" />
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default Home;
