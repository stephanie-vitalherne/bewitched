import React from "react";
import { LogBox } from "react-native";
LogBox.ignoreAllLogs(); //ignore log notification by message
import StackNavigator from "./StackNavigator";
import { AuthProvider } from "./hooks/useAuth";
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <StackNavigator />
      </AuthProvider>
    </NavigationContainer>
  );
}
