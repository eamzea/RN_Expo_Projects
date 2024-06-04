import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import HomeScreen from "./src/screens/HomeScreen";
import ComponentsScreen from "./src/screens/ComponentsScreen";
import ListScreen from "./src/screens/ListScreen";
import ImageScreen from "./src/screens/ImageScreen";
import CounterScreen from "./src/screens/CounterScreen";
import ColorScreen from "./src/screens/ColorScreen";
import SquareScreen from "./src/screens/SquareScreen";
import TextScreen from "./src/screens/TextScreen";
import BoxScreen from "./src/screens/BoxScreen";
import FlexScreen from "./src/screens/FlexScreen";
import PositionScreen from "./src/screens/PositionScreen";

const navigator = createStackNavigator(
  {
    Home: HomeScreen,
    Components: ComponentsScreen,
    List: ListScreen,
    Images: ImageScreen,
    Counter: CounterScreen,
    AddColor: ColorScreen,
    Square: SquareScreen,
    Text: TextScreen,
    Position: PositionScreen,
    Box: BoxScreen,
    Flex: FlexScreen,
  },
  {
    initialRouteName: "Home",
    defaultNavigationOptions: {
      title: "My First Mobile App",
    },
  }
);

export default createAppContainer(navigator);
