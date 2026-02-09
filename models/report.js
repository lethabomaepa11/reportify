export class Report {
    constructor(title, description, location = new ReportLocation()) {
        this.title = title;
        this.description = description;
        this.location = location;
        this.id = Date.now();
        this.created_at = new Date();
        this.location = location;
    }
}
export class ReportLocation{
    constructor(latitude, longitude) {
        this.latitude = latitude;
        this.longitude = longitude;
    }
}


