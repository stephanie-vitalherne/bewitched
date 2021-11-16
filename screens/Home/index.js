import React, { useRef, useState, useEffect, useLayoutEffect } from "react";
import { View, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/core";
import useAuth from "../../hooks/useAuth";
import tw from "tailwind-rn";
import Swiper from "react-native-deck-swiper";
import { SwipeCard, NoProfile, Buttons, Header } from "../../components";
import {
  onSnapshot,
  doc,
  setDoc,
  getDoc,
  getDocs,
  query,
  where,
  collection,
} from "@firebase/firestore";
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
      const passes = getDocs(collection(db, "users", user.uid, "passes")).then(
        (snapshot) => snapshot.docs.map((doc) => doc.id)
      );
      const matches = getDocs(
        collection(db, "users", user.uid, "matches")
      ).then((snapshot) => snapshot.docs.map((doc) => doc.id));

      const passedUserIds = passes.length > 0 ? passes : ["test"];
      const matchedUserIds = matches.length > 0 ? matches : ["test"];

      unsub = onSnapshot(
        query(
          collection(db, "users"),
          where("id", "not-in", [...passedUserIds, ...matchedUserIds])
        ),
        (snapshot) => {
          setProfiles(
            snapshot.docs
              .filter((doc) => doc.id !== user.uid)
              .map((doc) => ({
                id: doc.id,
                ...doc.data(),
              }))
          );
        }
      );
    };
    fetchCards();
    return unsub;
  }, []);

  const swipeLeft = (cardIndex) => {
    if (!profiles[cardIndex]) return;
    const userSwipe = profiles[cardIndex];
    console.log(`You passed ${userSwipe.displayName}`);

    setDoc(doc(db, "users", user.uid, "passes", userSwipe.id), userSwipe);
  };

  const swipeRight = async (cardIndex) => {
    if (!profiles[cardIndex]) return;

    const userSwipe = profiles[cardIndex];
    setDoc(doc(db, "users", user.uid, "matches", userSwipe.id), userSwipe);
    // const loggedInProfile = await (
    //   await getDoc(doc(db, "users", user.uid))
    // ).data();
  };

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
          onSwipedLeft={(cardIndex) => {
            console.log("Swipe Pass");
            swipeLeft(cardIndex);
          }}
          onSwipedRight={(cardIndex) => {
            console.log("Swipe Match");
            swipeRight(cardIndex);
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
