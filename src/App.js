import {
  createStackNavigator,
} from 'react-navigation';

import Home from './screens/Home';
import RestaurantPage from './screens/RestaurantPage';
// import SidePane from './components/SidePane';
global.restaurantList = [];

const App = createStackNavigator({
  Home: { screen: Home },
  RestaurantPage: { screen: RestaurantPage },
  // SidePane: { screen: SidePane },
});

export default App;