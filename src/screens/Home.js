
import React from 'react';
import {
  Text, 
  View,
  FlatList,
  ActivityIndicator,
  PermissionsAndroid
} from 'react-native';
import { Item, Content, Card, CardItem, Body, Input, Icon } from "native-base";
import Drawer from 'react-native-drawer';

import API from '../modal/ApiFunction';
import RestaurantCard from '../components/RestaurantCard';
import Header from '../components/Header';
import NavBar from '../components/NavBar';
import SidePane from '../components/SidePane';
import styles from '../styles/styles';
import { getDistance, compare, requestCameraPermission} from '../modal/Utility'

export default class Home extends Header {
  // static navigationOptions = {
  //   title: 'Home',
  //   headerStyle: {
  //     backgroundColor: '#f4511e',
  //   },
  //   headerTintColor: '#fff',
  //   headerTitleStyle: {
  //     fontWeight: 'bold',
  //   },
  //   headerRight: <Icon style={styles.iconStyle} name="menu" size={25} onPress={ () => this.test()} />
  // };
  constructor() {
    super()
    this.state = {
      restaurantList: [],
      loader: true,
      location: {},
      search: ''
    }
  }
  async getAPI(location) {
    const res = await API.get('http://www.mocky.io/v2/5ac4842c2f00005600f5f9fb');
      if (typeof res == 'object' && res.restaurantList) {
        let restaurantList = res.restaurantList;
        let data = [];
        for(let i in restaurantList) {
          data.push({
            lat: restaurantList[i]['location']['latitude'], 
            long: restaurantList[i]['location']['longitude']
          })
        }
        restaurantList = getDistance(location.latitude, location.longitude, data, restaurantList);
        global.restaurantList = restaurantList;
        restaurantList.sort(compare);
        this.setState({ restaurantList: restaurantList, loader: false })
      }
  }
async getData() {
  navigator.geolocation.watchPosition(
        (position) => {
            let location = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            }
            this.getAPI(location);
            this.setState({ location })
        },
        (error) => { 
          console.log(error)
          // self.setState({ error: error.message, isLoading : false })
        },
        { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000, distanceFilter: 10 },
    );

}
  async componentDidMount() {
    await requestCameraPermission()
    const granted = await PermissionsAndroid.check( PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION );
    if (granted) {
      this.getData();
    } 
    else {
      alert("Please enable location");
    }
  }
  filterData(search) {
    this.setState({ search })
  }
  renderItem(item) {
    if (item.name.indexOf(this.state.search) > -1) {
      return (
        <RestaurantCard 
          navigation = { this.props.navigation } 
          item = { item }
        />
      )
    }
  }
  renderList() {
    if (Array.isArray(this.state.restaurantList) && this.state.restaurantList.length > 0) {
      return(
        <FlatList
          style = {{ width: '100%' }}
          data = { this.state.restaurantList }
          keyExtractor = {(item, index) => item.id }
          renderItem = {({item}) => this.renderItem(item) }
        />
      )
    }
  }
  closeControlPanel = () => {
    this._drawer.close()
  };
  openControlPanel = () => {
    this._drawer.open()
  };
  render() {
    return (
      <Drawer
        ref={(ref) => this._drawer = ref}
        content = { <SidePane navigation = { this.props.navigation } /> }
        type = { 'overlay' }
        tapToClose = { true }
        openDrawerOffset = { 0.2 }
        panCloseMask = { 0.2 }
        closedDrawerOffset = { -3 }
        styles = { {
  drawer: { shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3},
  main: {paddingLeft: 3},
} }
          tweenHandler = { (ratio) => {
  return {
    mainOverlay: { opacity: ratio === 0 ? 0 : 0.4, backgroundColor: '#000' }
  };
}}
        
        >
        <View style={styles.container}>
          <NavBar 
            title = { 'Home' }
            onPress = { this.openControlPanel.bind(this) }
          />
          <Item>
            <Input 
              placeholder = 'Type restaurant name here..'
              onChangeText = { (text) => this.filterData(text) }
            />
          </Item>
          {
            this.state.loader ? 
              <View style={styles.loader}><ActivityIndicator size="large" color="#00ff00" /></View>
            : this.renderList()
          }
        </View>
      </Drawer>
    );
  }
}


