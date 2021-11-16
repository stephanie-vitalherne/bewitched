import React, { useRef, useState, useEffect, useLayoutEffect } from "react";
import { View, SafeAreaView, Pressable, Image } from "react-native";
import { useNavigation } from "@react-navigation/core";
import useAuth from "../../hooks/useAuth";
import tw from "tailwind-rn";
import Swiper from "react-native-deck-swiper";
import { SwipeCard, NoProfile, Buttons, Header } from "../../components";
import { onSnapshot, doc, collection } from "@firebase/firestore";
import { db } from "../../data/firebase";

const Home = () => {
  const navigation = useNavigation();
  const { user, logout } = useAuth();
  const swipeRef = useRef();
  const [profiles, setProfiles] = useState([]);

  useLayoutEffect(
    () =>
      onSnapshot(doc(db, "users", user.uid), (snapshot) => {
        if (!snapshot.exists()) {
          navigation.navigate("Modal");
        }
      }),
    []
  );

  useEffect(() => {
    let unsub;

    const fetchCards = async () => {
      unsub = onSnapshot(collection(db, "users"), (snapshot) => {
        setProfiles(
          snapshot.docs
            .filter((doc) => doc.id !== user.uid)
            .map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))
        );
      });
    };
    fetchCards();
    return unsub;
  }, []);

  return (
    <SafeAreaView style={tw("bg-gray-700 flex-1")}>
      {/* Header */}
      <Header
        onPressLogout={logout}
        photoURL={user.photoURL}
        onPressModal={() => navigation.navigate("Modal")}
        onPressChat={() => navigation.navigate("Chat")}
      />

      {/* Swipe Container */}
      <View style={tw("flex-1 -mt-6")}>
        <Swiper
          ref={swipeRef}
          stackSize={5}
          cardIndex={0}
          cards={profiles}
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
          renderCard={(card) =>
            card ? (
              <SwipeCard
                id={card.id}
                age={card.age}
                job={card.job}
                photoURL={card.photoURL}
                displayName={card.displayName}
              />
            ) : (
              <NoProfile />
            )
          }
        />
      </View>

      {/* Buttons */}
      <Buttons
        onPressLeft={() => swipeRef.current.swipeLeft()}
        onPressRight={() => swipeRef.current.swipeRight()}
      />
    </SafeAreaView>
  );
};

export default Home;
