import { PermissionsAndroid } from 'react-native';
export async function requestCameraPermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        'title': 'Example App',
        'message': 'Example App access to your location '
      }
    )
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("You can use the location")
    } else {
      console.log("location permission denied")
    }
  } catch (err) {
    console.warn(err)
  }
}

function toRoad(value) {
  return value * Math.PI / 180
}
export function getDistance(lat, long, array, list) {
    var lat2 = lat; 
    var lon2 = long; 
    let ret = [];
    for (let i in array) {
      var lat1 = array[i].lat; 
      var lon1 = array[i].long; 

      var R = 6371;
      var x1 = lat2-lat1;
      var dLat = toRoad(x1);  
      var x2 = lon2-lon1;
      var dLon = toRoad(x2);  
      var a = Math.sin(dLat/2) * Math.sin(dLat/2) + 
                      Math.cos(toRoad(lat1)) * Math.cos(toRoad(lat2)) * 
                      Math.sin(dLon/2) * Math.sin(dLon/2);  
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
      var d = R * c; 
      console.log(d);
      list[i].distance = d;
    }
    return list;
}

export function compare(a,b) {
  if (a.distance < b.distance)
    return -1;
  if (a.distance > b.distance)
    return 1;
  return 0;
}
