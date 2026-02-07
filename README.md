# Reportify

This is a simple application for reporting incidents and requesting service delivery

## How to run locally
1. Clone this repo on your machine using 
    ```bash 
    git clone https://github.com/lethabomaepa11/reportify.git
    ```
1. Open the folder on VS Code using
    ```bash
    code reportify
    ```
2. Make sure you have installed [Live Server](https://marketplace.visualstudio.com/items?itemName=ms-vscode.live-server)
3. Click on the preview button on your right(if default VS code settings)
4. Make changes and see them reflect on the preview.

## About
- This project does not use any backend or consume any apis, we use [localstorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage), to store mock data
- Entities are represented as Javascript classes/objects

## Entities (as JS classes)
Below are the entities you will be able to access in the localstorage, they are saved as is(as named below)
- reports: 
  ```js
  //NB: an array of reports is stored in the localstorage
  //Below is just a representation of a single report object
  Report{
        id: string;
        title: string;
        description: string;
        created_at: datetime;
        location: {
            longitude: Number
            latitude: Number
        }
    }

    //access reports from localstorage
    const reports = localstorage.get("reports");
    //example result
    console.log(reports)
    /**
     * [{
        id: XXXXX;
        title: XXXXX;
        description: XXXXX;
        created_at: XXXXX;
        location: {
            longitude: XXXXX
            latitude: XXXXX
        }
     },
        id: XXXXX;
        title: XXXXX;
        description: XXXXX;
        created_at: XXXXX;
        location: {
            longitude: XXXXX
            latitude: XXXXX
        }]
     **/
  ```

  - assignments: 
  ```js
  //NB: an array of assignments is stored in the localstorage
  //Below is just a representation of a single assignment object
  Assignment{
        id: string;
        report_id:string;
        department_id:string;
        title: string;
        created_at: datetime;
        status:string;
    }

    //access assignments from localstorage
    const assignments = localstorage.get("assignments");
    //example result
    console.log(assignments)
    /**
     * [{
            id: XXXXX;
            report_id:XXXX;
            department_id:XXXX;
            title: XXXX;
            created_at: XXXX;
            status:XXXX;
        },
        {
            id: XXXXX;
            report_id:XXXX;
            department_id:XXXX;
            title: XXXX;
            created_at: XXXX;
            status:XXXX;
        }]
     **/
  ```