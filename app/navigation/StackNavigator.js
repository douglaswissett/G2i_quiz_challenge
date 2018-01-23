import {
  StackNavigator,
} from 'react-navigation';
import HomeScreen from '../screens/HomeScreen';
import QuestionScreen from '../screens/QuestionScreen';
import ResultScreen from '../screens/ResultScreen';

export default StackNavigator({
  Home: {
    screen: HomeScreen,
  },
  Question: {
    screen: QuestionScreen
  },
  Result: {
    screen: ResultScreen
  }
}, {
  initialRouteName: 'Home',
  headerMode: 'none'
});