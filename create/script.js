
/**Location methods */
function getLocation() {
    if (navigator.geolocation) {
        //get the position
        navigator.geolocation.getCurrentPosition(getPosition, getLocationError)
    }
}

// Helper functions for the getLocation(callback functions)
function getPosition(position) {
    reportLocation.latitude = position.coords.latitude;
    reportLocation.longitude = position.coords.longitude;
}
function getLocationError(error) {
    return {
        error: error.message
    }
}

// Elements
const txtTitle = document.getElementById("title");
const txtDescription = document.getElementById("description");
const reportForm = document.getElementById("reportForm");

//event listeners

//get user location
window.addEventListener("load", getLocation);
reportForm.addEventListener("submit", handleFormSubmission);
const reportLocation = { latitude: null, longitude: null };

function handleFormSubmission(e){
    e.preventDefault();
    if (reportLocation.latitude == null) {
        alert("Cannot create a report without location access, Please allow location access");
        getLocation();
        return;
    }

    //inputs
    const title = txtTitle.value;
    const description = txtDescription.value;

    if (!title.length || !description.length) {
        alert("Make sure the form is completed.")
        return;
    }
    //create a new date object
    const date = new Date();
    const report = {
                id: Date.now(),
                title,
                description,
                created_at: date,
                location: {
                    longitude: reportLocation.longitude,
                    latitude: reportLocation.latitude,
                }
            }

    //insert the report into the existing reports in localstorage
    insertItem("reports", report)
    
    //clear inputs
    txtTitle.value = "";
    txtDescription.value = "";

    //show success message
    alert("Form Submitted successfully!")
}


//function to insert item into localstorage without overwriting the currently stored items
function insertItem(name, data) {
    //get the stored string
    let item = localStorage.getItem(name);
    //check if its not empty
    if (item) {
        //parse to javascript array
        item = JSON.parse(item);
        //push new data
        item.push(data);
    }
    else {
        //no data exists for that item
        //create new array for that item
        item = [data];
    }

    //store the item in the localstorage
    localStorage.setItem(name, JSON.stringify(item));
}



