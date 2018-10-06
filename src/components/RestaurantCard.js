import React from 'react';
import {
  Text, 
  View,
  FlatList,
  Image
} from 'react-native';
import { Header, Content, Card, CardItem, Body } from "native-base";

import styles from '../styles/styles';

export default class RestaurantCard extends React.Component {
  navigateRestaurent(item) {
    this.props.navigation.navigate('RestaurantPage', {title: item.name,  item: item });
  }
  render() {
    const { item } = this.props;
    // console.log(item)
    if (typeof item !== 'undefined') {
      return (
        <View style={styles.cardcontainer}>
          <Card>
          <CardItem header button onPress={() => this.navigateRestaurent(item)}>
            <Text style={styles.bold}>{item.name}</Text>
          </CardItem>
          <CardItem button onPress={() => this.navigateRestaurent(item)}>
            <Body>
              <Image 
                source = {{ uri: item.image_url }} 
                style = { styles.image }
                resizeMode = { 'contain' }
              />
            </Body>
          </CardItem>
          {
            item.contact ? 
            <CardItem footer button onPress={() => this.navigateRestaurent(item)}>
              <Text>Contact: {item.contact}</Text>
            </CardItem> : null
          }
        </Card>
        </View>
      );
    } else {
      return null
    }
    
  }
}

