import React from "react";
import { View, Button } from "react-native";
import useAuth from "../../hooks/useAuth";

const Home = () => {
  const { logout } = useAuth();
  return (
    <View>
      <Button title="Log Out" onPress={logout} />
    </View>
  );
};

export default Home;
