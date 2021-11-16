import React, { useState } from "react";
import { View, Text, Image, TextInput, Pressable } from "react-native";
import tw from "tailwind-rn";
import useAuth from "../../hooks/useAuth";
import { useNavigation } from "@react-navigation/core";
import { doc, setDoc, serverTimestamp } from "@firebase/firestore";
import { db } from "../../data/firebase";

const Modal = () => {
  const { user } = useAuth();
  const navigation = useNavigation();
  const [image, setImage] = useState(null);
  const [job, setJob] = useState(null);
  const [age, setAge] = useState(null);

  const incompleteForm = !image || !job || !age;

  const updateProfile = () => {
    setDoc(doc(db, "users", user.uid), {
      id: user.uid,
      displayName: user.displayName,
      photoURL: image,
      job: job,
      age: age,
      timestamp: serverTimestamp(),
    })
      .then(() => {
        navigation.navigate("Home");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <View style={tw("flex-1 items-center pt-1")}>
      <Image
        source={require("../../assets/logo.png")}
        style={tw("h-56 w-full bottom-10")}
        resizeMode="contain"
      />
      <Text style={tw("text-xl text-gray-500 p-2 font-bold bottom-36")}>
        Welcome {user.displayName}
      </Text>
      <Text style={tw("text-center p-4 font-bold text-purple-400 bottom-36")}>
        Step 1: The Profile Pic
      </Text>
      <TextInput
        value={image}
        onChangeText={setImage}
        placeholder="Enter a Profile Picture URl"
        style={tw("bottom-36 text-center text-xl pb-2")}
      />
      <Text style={tw("text-center p-4 font-bold text-purple-400 bottom-36")}>
        Step 2: The Job
      </Text>
      <TextInput
        value={job}
        onChangeText={setJob}
        placeholder="Enter your occupation"
        style={tw("bottom-36 text-center text-xl pb-2")}
      />
      <Text style={tw("text-center p-4 font-bold text-purple-400 bottom-36")}>
        Step 3: The Age
      </Text>
      <TextInput
        value={age}
        onChangeText={setAge}
        placeholder="Enter your age"
        style={tw("bottom-36 text-center text-xl pb-2")}
        maxLength={2}
        keyboardType="numeric"
      />
      <Pressable
        disabled={incompleteForm}
        onPress={updateProfile}
        style={[
          tw("w-64 p-3 absolute bottom-10 rounded-xl"),
          incompleteForm ? tw("bg-gray-400") : tw("bg-purple-600"),
        ]}
      >
        <Text style={tw("text-center text-white text-xl")}>Update Profile</Text>
      </Pressable>
    </View>
  );
};

export default Modal;
