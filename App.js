import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

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


const navigator = createStackNavigator({
  Home: HomeScreen,
  JoinLobby: JoinLobbyScreen,
  CreateLobby: CreateLobbyScreen,
  Help: HelpScreen,
  ResultPage: ResultPageScreen,
  Game: GameScreen,
},{
  initialRouteName: 'Home',
  headerMode: 'none',
});

export default createAppContainer(navigator);