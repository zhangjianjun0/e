//function MyAjax() {
//	);
//}
import fetchJsonp from "fetch-jsonp"
var MyAjax = {
	ajax(option, callback) {
		
		$.ajax({
			type: option.type,
			url: option.url,
			data: option.data,
			dataType: option.dataType,
			success: function(data) {			
				callback(data);
			}
		})
	},
	fetch(url, successCallback, errCallback) {
		fetch(url).then(function(response) {
			return response.json();
		}).then(function(data) {
			successCallback(data);
		}).catch(function(e) {
			errCallback("error");
		});
	},
	fetchJsonp(url, successCallback, errCallback) {
		fetchJsonp(url).then(function(response) {
			return response.json();
		}).then(function(data) {
			successCallback(data);
		}).catch(function(e) {
			errCallback("error");
		});
	}

}
export default MyAjax;