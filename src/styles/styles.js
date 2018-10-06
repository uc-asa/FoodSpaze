import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
  loader: {
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    alignItems: 'center'
  },
  container: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  cardcontainer: {
    width: '100%',
    height: 'auto',
    paddingHorizontal: 10,
  },
  bold: {
    fontWeight: 'bold',
  },
  image: {
    height: 200,
    width: '90%',
  },
  foodContainer: {
    paddingLeft: 20,
    height: 'auto',
    width: '100%',
  },
  ratingColor: {
    color: '#D0A800'
  }, 
  iconStyle: {
    paddingRight: 20,
    color: '#fff'
  },
  navbar: {
    backgroundColor: '#f4511e',
    height:  60,
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 15
  },
  navbarText: {
    color: '#FFF',
    fontSize: 16,
    textAlign: 'left'
  },
  list: {
    fontSize: 16,
    paddingVertical: 10
  },
  iconView: {
    flex: 1,
    alignItems: 'flex-end'
  },
  sidePane: {
    backgroundColor: '#fff',
    height: '100%',
    paddingHorizontal: 15,
    paddingTop: 20
  }
});
export default styles;