import MockDB from "../models/MockDB.js";
import { Report, ReportLocation } from "../models/report.js";

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
    //create a new report object
    const report = new Report(title, description, new ReportLocation(reportLocation.latitude, reportLocation.longitude));

    //insert the report into the existing reports in localstorage
    const db = new MockDB();
    db.insert("reports", report);
    
    //clear inputs
    txtTitle.value = "";
    txtDescription.value = "";

    //show success message
    alert("Form Submitted successfully!")
}






