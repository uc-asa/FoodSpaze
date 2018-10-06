
import React from 'react';
import {
  Text, 
  View,
  FlatList,
  Image,
} from 'react-native';
import { Container, Content, Card, CardItem, Body, Icon } from "native-base";
import StarRating from 'react-native-star-rating';
import Drawer from 'react-native-drawer';
import NavBar from '../components/NavBar';
import Header from '../components/Header';
import SidePane from '../components/SidePane';

import styles from '../styles/styles';


export default class RestaurantPage extends Header {
  // static navigationOptions = ({ navigation }) => {
  //   return({title: navigation.state.params.title || 'Restaurant',
  //   headerStyle: {
  //     backgroundColor: '#f4511e',
  //   },
  //   headerRight: <Icon style={styles.iconStyle} name="menu" size={25} onPress={ () => alert("as")} />,
  //   headerTintColor: '#fff',
  //   headerTitleStyle: {
  //     fontWeight: 'bold',
  //   }})
  // };
  renderFood(value) {
  	let s = [];
  	if (value.length > 0) {
  		for (let i in value) {
  			const item = value[i]
  			s.push(
	  			<View style={styles.cardcontainer}>
		          <Card>
		          <CardItem header>
		            <Text style={styles.bold}>{item.dish_name}</Text>
		          </CardItem>
		          <CardItem>
		            <Body>
		              <Text style={styles.bold}>Price: {item.price}</Text>
		            </Body>
		          </CardItem>
		          {
		            item.rating ? 
		            <CardItem footer>
		                <StarRating
		                  disabled = { true }
		                  maxStars = { 5 }
		                  starStyle = { styles.ratingColor }
		                  containerStyle = {{ width: 70 }}
		                  rating = { item.rating || 0 }
		                  starSize = { 15 }
		                />
		            </CardItem> : null
		          }
		        </Card>
		        </View>
	  		)
  		}
  	}
  	return s;
  }
  renderNoItem() {
  	return(
  		<View style={styles.foodContainer}>
			<Text>No item in this restaurant..</Text>
		</View>
  	)
  }
  renderItem(item) {
  	if (Object.keys(item).length > 0) {
  		let s = [];
  		for (let i in item) {
  			s.push(
  				<View style={styles.foodContainer}>
  					<Text>{i}</Text>
  					{this.renderFood(item[i])}
  				</View>
  			)
  		}
  		return s;
  	}
  	return this.renderNoItem()
  	
  }
  renderList(item) {
  	if (item) {
  		return(
	        <FlatList
	          style = {{ width: '100%' }}
	          data = {item }
	          keyExtractor = {(item, index) => item.id }
	          renderItem = {({item}) => this.renderItem(item) }
	        />
	      )
  	}
    return this.renderNoItem()
  }
  closeControlPanel = () => {
    this._drawer.close()
  };
  openControlPanel = () => {
    this._drawer.open()
  };
  render() {
  	const params = this.props.navigation.state.params;
  	if (params) {
  		return(
  			<Drawer
		        ref={(ref) => this._drawer = ref}
		        content = { <SidePane closeControlPanel={() => this.closeControlPanel()} navigation = { this.props.navigation } /> }
		        tapToClose = { true }
		        openDrawerOffset = { 0.2 }
		        panCloseMask = { 0.2 }
		        closedDrawerOffset = { -3 }
		        type = { 'overlay' }
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
			            title = { params.title }
			            onPress = { this.openControlPanel.bind(this) }
		          	/>
	  				<Text style={styles.bold}>{params.item.name}</Text>
	  				<Image 
		                source = {{ uri: params.item.image_url }} 
		                style = { styles.image }
		                resizeMode = { 'contain' }
		            />
		        	{this.renderList(params.item.menu_list)}
		      	</View>
	      	</Drawer>
  		)
  	}
    return (
      <View style={styles.container}>
        <Text>No data found for this restaurant</Text>
      </View>
    );
  }
}

const drawerStyles = {
  drawer: { shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3},
  main: {paddingLeft: 3},
}

