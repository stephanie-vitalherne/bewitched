import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import tw from "tailwind-rn";

const SwipeCard = ({ id, photoURL, firstName, lastName, job, age }) => {
  return (
    <View key={id} style={tw("relative bg-white h-3/4 rounded-xl")}>
      {/* Card Image */}
      <Image
        style={tw("h-full w-full rounded-xl absolute top-0")}
        source={{ uri: photoURL }}
      />

      {/* Card Info */}
      <View
        style={[
          tw(
            "bg-white w-full h-20 absolute bottom-0 justify-between items-center flex-row px-6 py-2 rounded-b-xl"
          ),
          styles.shadow,
        ]}
      >
        <View>
          <Text style={tw("text-xl font-bold")}>
            {firstName} {lastName}
          </Text>
          <Text>{job}</Text>
        </View>
        <Text style={tw("text-2xl")}>{age}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
});

export default SwipeCard;
