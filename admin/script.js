import Assignment from '../models/assignment.js';

//With the storage initializations and reading, we will have to have them in their own separate class
//Initialize the local storage key for assignment

//Dummy reports for testing
/*let reports=[
    {
      id: 'report1',
      title: 'XXXXX',
      description: 'XXXXX',
      created_at: 'XXXXX',
      location: {
          longitude: 'XXXXX',
          latitude: 'XXXXX'
      }
   },
   {
      id: 'report2',
      title: 'XXXXX',
      description: 'XXXXX',
      created_at: 'XXXXX',
      location: {
          longitude: 'XXXXX',
          latitude: 'XXXXX'
      }
    }
]

//save the dummy reports

localStorage.setItem('reports',JSON.stringify(reports));
//dummy departments from
let departments = [
  {
    id: "health",
    name: "Health",
    assignments: []
  },
  {
    id: "water",
    name: "Water",
    assignments: []
  },
];

//save these dummy departments

localStorage.setItem('departments',JSON.stringify(departments));


localStorage.setItem('assignments',JSON.stringify([]));
*/


let reports=JSON.parse(localStorage.getItem('reports'))||[];
//Method to build up the reports list
//Currently it does too much, will break it down into more methods
function populateReportsList(reportsList){
    //Get the reports list element from the html file
    const reportsListUI=document.getElementById('reportsList');
    reportsListUI.innerHTML='';

    //Create report elements 
    for(let i=0;i<reportsList.length;i++){
        let listItem=document.createElement('li'); //List item for individual reports
        const itemDivider=document.createElement('hr'); //The divider under each report
        const assignedDepartment=document.createElement('p');
        const assignButton=document.createElement('button'); //The assign button
        const departmentOptions=document.createElement('select'); //Department selector

        //We will stick to two departments for simplicity(You can add more if you want)
        const healthDepOption=document.createElement('option');
        const waterDepOption=document.createElement('option');

        //Set values for the select options
        healthDepOption.value='health';
        waterDepOption.value='water';

        //Set the display text for the select option
        healthDepOption.textContent='Health Department';
        waterDepOption.textContent='Water Department';

        
         //The text of the list items
        listItem.innerText=`Report Id:${reportsList[i].id}
                                \nTitle: ${reportsList[i].title}
                                \nDescription: ${reportsList[i].description}
                                \nReport date: ${reportsList[i].created_at}
                                \nLong: ${reportsList[i].location['longitude']}
                                  Lat: ${reportsList[i].location['latitude']}`
        ;

        //Add the items we have created to the html list
        reportsListUI.appendChild(listItem);
        reportsListUI.appendChild(assignedDepartment)


        console.log(isAssigned(reportsList[i].id));

        //Assign the assign report function as the assign button click event handler
        if(isAssigned(reportsList[i].id)===false){
            //Add the options to the select
            departmentOptions.appendChild(healthDepOption);
            departmentOptions.appendChild(waterDepOption);

            //Set the display text of the assign button
            assignButton.textContent='Assign';
            assignButton.addEventListener('click',()=>{
            assignReport(reportsList[i].id,departmentOptions.value),
            assignedDepartment.textContent='Assigned to: '+isAssigned(reportsList[i].id);

       
            });
            
            reportsListUI.appendChild(departmentOptions);
            reportsListUI.appendChild(assignButton);

        }
        else{
            assignedDepartment.textContent='Assigned to: '+isAssigned(reportsList[i].id);
        }
        
        
       
        reportsListUI.appendChild(itemDivider);
    }
}



//The function to assign a report to a department
function assignReport(reportId,departmentId){
    //Return if the report is already assigned
    if(isAssigned(reportId)!==false){
        return;
    }

    //Get reports from local storage
    let reports=JSON.parse(localStorage.getItem('reports'))||[];

    //Check if the report and department exist using the loops
    for(let i=0;i<reports.length;i++){
        if(reports[i].id===reportId){
            let departments=JSON.parse(localStorage.getItem('departments'))||[];
            for(let j=0;j<departments.length;j++){
                if(departments[j].id===departmentId){
                    let assignments=JSON.parse(localStorage.getItem('assignments'))||[];//Get assignments from local storage
                    let assignment=new Assignment(reportId,departmentId);//Create the assignment
                    //Push the new assignment
                    //**Some redundant work happening here(Assignment is saved twice, will discuss and fix)
                    assignments.push(assignment);
                    departments[j].assignments.push(assignment.id);
                    
                    //save to local storage
                    localStorage.setItem('departments',JSON.stringify(departments));
                    localStorage.setItem('assignments',JSON.stringify(assignments));


                    console.log(localStorage.getItem('assignments'));

                    //Stop the inner loop after finding the department, creating assignment, and assigning
                    break;
                }
            }
            //Stop the outer loop after finding the report
            break;
        }

    }


    populateReportsList(reports);


}



//Check if a report has been assigned to a department
//If assigned, return department ID
//Else, return false
function isAssigned(reportId){
    let assignments=JSON.parse(localStorage.getItem('assignments'))||[];

    for(let i=0;i<assignments.length;i++){
        if(assignments[i].report_id===reportId){
            return assignments[i].department_id;
        }
    }
    return false;
}









populateReportsList(reports);