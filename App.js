import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";


// Context
import { Provider as LobbyProvider } from "./src/context/LobbyContext";
import { Provider as AuthProvider } from "./src/context/AuthContext";

// navigator refference
import { setNavigator } from "./src/navigationRef";

// Ignore Warnings
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications



// Screens in the app
import HomeScreen from "./src/screens/HomeScreen";
import JoinLobbyScreen from "./src/screens/JoinLobbyScreen";
import CreateLobbyScreen from "./src/screens/CreateLobbyScreen";
import HelpScreen from "./src/screens/HelpScreen";
import ResultPageScreen from "./src/screens/ResultPageScreen";
import GameScreen from "./src/screens/GameScreen";
import LoadingScreen from "./src/screens/LoadingScreen";

const navigator = createStackNavigator({
  Home: HomeScreen,
  JoinLobby: JoinLobbyScreen,
  CreateLobby: CreateLobbyScreen,
  Help: HelpScreen,
  ResultPage: ResultPageScreen,
  Game: GameScreen,
  Loading: LoadingScreen
},{
  initialRouteName: 'Home',
  headerMode: 'none',
});

const App = createAppContainer(navigator);

export default () => {
  return (
    <LobbyProvider>
      <AuthProvider>
        <App  ref = {(navigator) =>  {setNavigator(navigator)}}/>
      </AuthProvider>
    </LobbyProvider>
  );
}