var mapMain;

// @formatter:off
require([
        "esri/map",
        "esri/geometry/Extent",
        "esri/layers/ArcGISDynamicMapServiceLayer",
        "esri/layers/FeatureLayer",
        "esri/dijit/BasemapToggle",
        "esri/dijit/Scalebar",
        "dojo/ready",
        "dojo/parser",
        "dojo/on",

        "dijit/layout/BorderContainer",
        "dijit/layout/ContentPane"],
    function (Map, Extent, ArcGISDynamicMapServiceLayer, FeatureLayer, BasemapToggle, Scalebar,
              ready, parser, on,
              BorderContainer, ContentPane) {
// @formatter:on

        // Wait until DOM is ready *and* all outstanding require() calls have been resolved
        ready(function () {

            // Parse DOM nodes decorated with the data-dojo-type attribute
            parser.parse();

            /*
             * Step: Specify the initial extent
             * Note: Exact coordinates may vary slightly from snippet/solution
             * Reference: https://developers.arcgis.com/javascript/jssamples/fl_any_projection.html
             */
var extentInitial = new Extent ({
    "xmin":-13654193.848692352,
    "ymin": 4532034.768405093,
    "xmax":-13629160.72192899,
    "ymax":4556303.524885604,
    "spatialReference": {
        "wkid":102100
    }
});

            // Create the map
            mapMain = new Map("cpCenter", {
                basemap: "satellite",
                extent: extentInitial
            });
            /*
             * Step: Add the USA map service to the map
             */
            var lyrUSA = new ArcGISDynamicMapServiceLayer("http://sampleserver6.arcgisonline.com/arcgis/rest/services/USA/MapServer", {
                opacity : 0.5});

            /*
             * Step: Add the earthquakes layer to the map
             */
            var lyrQuakes = new FeatureLayer("https://services.arcgis.com/ue9rwulIoeLEI9bj/ArcGIS/rest/services/Earthquakes/FeatureServer/0");
            lyrQuakes.setDefinitionExpression("magnitude >= 2.0")
            
            /*
            * Step: Revise code to use the addLayers() method
            */
            mapMain.addLayer(lyrUSA);
            mapMain.addLayer(lyrQuakes);
            /*
             * Step: Add the BaseMapToggle widget to the map
             */
            var toogle = new BasemapToggle ({
                 map : mapMain,
                 basemap : "topo"}, "BasemapToggle");
             toogle.startup ();

            /*
             * Step: Add the scalebar widget  to the map
             */
            var dijitScalebar = new Scalebar ({
                map = mapMain,
                scalebarUnit : "dual",
                attachTo : "bottom-left"});


            /*
             * Step: Add a legend once all layers have been added to the map
             */
            //mapMain.on(); // stub


        });
    });
