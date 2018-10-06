/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  Text, 
  View,
  FlatList
} from 'react-native';

import styles from '../styles/styles';

export default class SidePane extends React.Component {
  navigateRestaurent(item) {
    this.props.navigation.navigate('RestaurantPage', {title: item.name,  item: item });
    this.props.closeControlPanel && this.props.closeControlPanel();
  }
  renderList() {
    if (typeof restaurantList !== 'undefined') {
      return(
          <FlatList
            style = {{ width: '100%' }}
            data = { restaurantList }
            keyExtractor = {(item, index) => item.id }
            renderItem = {({item}) => this.renderItem(item) }
          />
        )
    }
  }
  renderItem(item) {
    if (item) {
      return (
        <Text style={styles.list} onPress={() => this.navigateRestaurent(item)}>{item.name || ''}</Text>
      )
    }
  }
  render() {
    // console.log(restaurantList);
    return (
      <View style={styles.sidePane}>
        {this.renderList()}
      </View>
    )
    // const { item } = this.props;
    // // console.log(item)
    // if (typeof item !== 'undefined') {
    //   return null      
    // } else {
    //   return null
    // }
    
  }
}

