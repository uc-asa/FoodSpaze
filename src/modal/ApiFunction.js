
const API = API || {};
API.get = function(url, where = {}, cl = function() {}) {
	return new Promise((resolve, reject) => {
		return fetch(url).
		then((response) => response.json())
		.then((responseJson) => {
			resolve(responseJson)
		}).catch((error) => {
			reject(error)
		});
	});
};
export default API;