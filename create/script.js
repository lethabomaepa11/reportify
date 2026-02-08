      /*  const report = {
                id: "string",
                title: "string",
                description: "string",
                created_at: "datetime",
                location: {
                    longitude: "Number",
                    latitude: "Number",
                }
            }
*/


// Elements
const txtTitle = document.getElementById("title");
const txtDescription = document.getElementById("description");
const txtLocation = document.getElementById("location");
const mapContainter = document.getElementById("mapContainer");


// 
const reportLocation = { latitude: 0, longitude: 0 };

function handleFormSubmission(){

}


function getLocation() {
    if (navigator.geolocation) {
        //get the position
        navigator.geolocation.getCurrentPosition(getPosition, getLocationError)
        return true;
    }
    return false;
}

// Helper functions for the getLocation(callback functions)
function getPosition(position) {
    reportLocation.latitude = position.coords.latitude;
    reportLocation.longitude = position.coords.longitude;
    //
}
function getLocationError(error) {
    return {
        error: error.message
    }
}
function toggleMap(isVisible = false) {
    //mapContainer element
    getLocation();
    //toggle display
    
    if (!isVisible) {
        
        //load map
        setTimeout(() => {
            console.log(reportLocation)
            mapContainter.style.display = "block"
        var map = L.map('map').setView([reportLocation.longitude, reportLocation.latitude], 13);
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);
        //get the position
            //add the coords on the map
        var marker = L.marker([reportLocation.longitude, reportLocation.latitude]).addTo(map);

        }, 400);
    }
    else {
        mapContainter.style.display = "none" 
    }
    
}