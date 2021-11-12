import React from "react";
import { View, Text, Button } from "react-native";
import useAuth from "../../hooks/useAuth";

const Login = () => {
  const { signInWithGoogle } = useAuth();
  return (
    <View>
      <Text></Text>
      <Button title="Login" onPress={signInWithGoogle} />
    </View>
  );
};

export default Login;
