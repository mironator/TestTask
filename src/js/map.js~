L.Icon.Default.imagePath = '/build/images'
var mymap = L.map('map_display').setView([53.907574,27.563224], 15);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpandmbXliNDBjZWd2M2x6bDk3c2ZtOTkifQ._QA7i5Mpkd_m30IGElHziw', 
  {
    maxZoom: 18,
    id: 'mapbox.streets'
  }
).addTo(mymap);

var markers = new L.MarkerClusterGroup();
mymap.addLayer(markers);


var app = angular.module('myApp', []);
app.controller('formCtrl', function($scope, $http) {
	$scope.text= "";
	$scope.experience= "";
	$scope.employment= "";
	$scope.schedule= "";
	$scope.currency= "";
	$scope.salary= "";
	
	$scope.text_label = "Ключевые слова";
	$scope.experience_label = "";
	$scope.employment_label = "";
	$scope.schedule_label = "";
	$scope.currency_label = "Валюта";
	$scope.salary_label = "";
	
	$scope.error= "";
	$scope.update= function() {
		loadMarkers();
	};

	var bounds = mymap.getBounds();
	mymap.on('moveend', loadMarkers);
	
	initForm(loadMarkers);
	
	
	function initForm(callback){
		$http({
			method : "GET",
			dataType: 'jsonp',
			url : "https://api.hh.ru/dictionaries"
		}).then(function(response) {
			
			//alert(JSON.stringify(response));
			$scope.text_label = "Text";
			$scope.experience_label = response.data.vacancy_cluster[5].name;
			$scope.employment_label = response.data.vacancy_cluster[9].name;
			$scope.schedule_label = response.data.vacancy_cluster[2].name;
			$scope.currency_label = "Currency";
			$scope.salary_label = response.data.vacancy_cluster[7].name;
			$scope.currencies = response.data.currency;
			$scope.experiencies = response.data.experience;
			$scope.employments = response.data.employment;
			$scope.schedules = response.data.schedule;
			callback();
		}, function(response) {
			$scope.error = response.statusText;
		});
	}

	
	function loadMarkers(){
		var bounds = mymap.getBounds();
		var zoom = mymap.getZoom();
		if(/*zoom < 15*/false){
			markers.clearLayers();
		} else{
			$http({
				method : "GET",
				dataType: 'jsonp',
				url : 
		"https://api.hh.ru/vacancies?per_page=500" +
		"&enable_snippets=true" + 
		"&label=with_address" +
		"&isMap=true&bottom_lat=" + bounds.getSouth() + 
		"&left_lng=" + bounds.getWest() + 
		"&top_lat=" + bounds.getNorth() + 
		"&right_lng=" + bounds.getEast() + 
		//"&_=1448885030019" + 
		($scope.text.length > 0 ? "&text=" + $scope.text : "") + 
		($scope.salary.length > 0 ? "&salary=" + $scope.salary + "&only_with_salary=true" : "") + 
		($scope.currency.length > 0 ? "&currency=" + $scope.currency : "") + 
		($scope.experience.length > 0 ? "&experience=" + $scope.experience : "") + 
		($scope.employment.length > 0 ? "&employment=" + $scope.employment : "") + 
		($scope.schedule.length > 0 ? "&schedule=" + $scope.schedule : "")
			
			}).then(function(response) {
				$scope.error = "";
				var vacancies = response.data.items;
				markers.clearLayers();
			
				for (var i = 0; i < vacancies.length; i++){
					var lat = vacancies[i].address.lat;
					var lng = vacancies[i].address.lng;
					var title = "<b>" + vacancies[i].employer.name + "</b><br />" + vacancies[i].name;
					if(lat != null && lng != null){
						var marker = L.marker(new L.LatLng(lat, lng), {
							title: title
						});
						marker.bindPopup(title);
						markers.addLayer(marker);
					}
				}
			}, function(response) {
				$scope.error = response.statusText;
			});
		}
	}
	
	
});
