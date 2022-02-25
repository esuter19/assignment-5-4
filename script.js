require([
	  "esri/Map",
      "esri/views/MapView",
	  "esri/layers/FeatureLayer",
    "esri/widgets/ScaleBar",
  "esri/widgets/Print",
      "dojo/domReady!"
    ], function(
      Map,MapView, FeatureLayer, ScaleBar, Print
    ) {
	  const fl = new FeatureLayer({
		url:"https://services2.arcgis.com/zNjnZafDYCAJAbN0/arcgis/rest/services/Traffic_Collisions/FeatureServer",
      outFields: ["*"],
      popupTemplate: template
	  });
      var map = new Map({
          basemap: "streets"
        });

        var view = new MapView({
          container: "viewDiv",
          map: map,
		  extent: {
			xmin: -118.264858634618,
			ymin: 33.5444932701483,
			xmax: -117.299011374275,
			ymax: 35.0054716855699,
            spatialReference: 4326
          }
          
        });
      
	  map.add(fl);
        
        var scaleBar = new ScaleBar({
  view: view,
          unit: "dual"
});
        view.ui.add(scaleBar, "bottom-left");
	  
  
  var template = {
        title: "What Happened?",
        content: [{
          type: "fields",
          fieldInfos: [{
            fieldName: "CollisnTyp",
            label: "Collision Type",
            visible: true
          }]
        }]
      };	

var symbol = {
  type: "simple-marker", 
  color:"red"
};
var renderer = {
  type: "simple",
  symbol: symbol
};
  
  view.when(() => {
          const print = new Print({
            view: view,
            printServiceUrl:
              "https://utility.arcgisonline.com/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task"
          });
    view.ui.add(print, "top-right");
  });
fl.renderer = renderer;
  
    });

