import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home, Chat, Login } from "./screens";
import useAuth from "./hooks/useAuth";

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  const { user } = useAuth();

  return (
    <Stack.Navigator>
      {user ? (
        <>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Chat" component={Chat} />
        </>
      ) : (
        <Stack.Screen name="Login" component={Login} />
      )}
    </Stack.Navigator>
  );
};

export default StackNavigator;
