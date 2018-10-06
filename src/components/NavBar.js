
import React from 'react';
import {
  Text, 
  View
} from 'react-native';
import { Icon } from "native-base";

import styles from '../styles/styles';


export default class NavBar extends React.Component {
  render() {
    return (
      <View style={styles.navbar}>
        <Text style={styles.navbarText}>{this.props.title || 'Home'}</Text>
        <View style={styles.iconView}>
          <Icon style={styles.iconStyle} name="menu" size={25} onPress={ () => this.props.onPress()} />
        </View>
      </View>
    )
  }
}

