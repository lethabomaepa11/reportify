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


//Method to build up the reports list
function populateReportsList(reportsList){
    //Get the reports list element from the html file
    const reportsListUI=document.getElementById('reportsList');
    //Clear the first to avoid duplication
    reportsListUI.innerHTML='';

    //Create report elements 
    for(let i=0;i<reportsList.length;i++){
        let listItem=document.createElement('li'); //List item for individual reports
        listItem.className='list-item';
        const itemDivider=document.createElement('hr'); //The divider under each report
        itemDivider.className='item-divider'
        const assignedDepartment=document.createElement('p');
        assignedDepartment.className='assigned-department';
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

        //Create the report title element
        const reportTitle=document.createElement('h3');
        reportTitle.textContent=reportsList[i].title;

        //Create the report date element
        const reportDate=document.createElement('p');
        reportDate.className='report-date';
        reportDate.textContent= new Date(reportsList[i].created_at).toDateString();

        //Create the report description element
        const reportDescription=document.createElement('p');
        reportDescription.className='report-description';
        reportDescription.textContent=reportsList[i].description;

        //Create the report location element
        const reportLocation=document.createElement('p');
        reportLocation.className='report-location';
        reportLocation.textContent=`Long: ${reportsList[i].location['longitude']}
                                    -Lat: ${reportsList[i].location['latitude']}`;
        
    
        //Add the elements to the list
        listItem.append(reportTitle);
        listItem.append(reportDate);
        listItem.append(reportDescription);
        listItem.append(reportLocation);
        reportsListUI.appendChild(listItem);
        reportsListUI.appendChild(assignedDepartment)

        

        //Conditional rendering based on if the report is assigned or not
        if(isAssigned(reportsList[i].id)===false){
            assignedDepartment.style.display='none';
            //Add the options to the select
            departmentOptions.appendChild(healthDepOption);
            departmentOptions.appendChild(waterDepOption);

            //Set the display text of the assign button
            assignButton.textContent='Assign';

            //Assign the assign report function as the assign button click event handler
            assignButton.addEventListener('click',()=>{
            assignReport(reportsList[i].id,departmentOptions.value),
            assignedDepartment.textContent='Assigned to: '+isAssigned(reportsList[i].id);
            });

            //Add the department select options and assign button to the list
            reportsListUI.appendChild(departmentOptions);
            reportsListUI.appendChild(assignButton);
        }
        else{
            //If the report is already assigned, set the department to the department text
            assignedDepartment.textContent='Assigned to: '+isAssigned(reportsList[i].id);
        }
       
        //Add the divider under each item
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
    let departments=JSON.parse(localStorage.getItem('departments'))||[];

    let reportObj=reports.find(report=>report.id===reportId);
    let departmentObj=departments.find(department=>department.id===departmentId);

    if( reportObj && departmentObj){
        let assignments=JSON.parse(localStorage.getItem('assignments'))||[];//Get assignments from local storage
        let assignment=new Assignment(reportId,departmentId);//Create the assignment
        assignments.push(assignment);
        localStorage.setItem('assignments',JSON.stringify(assignments));

    }
    else{
        alert('Invalid report or department\nAssignment not successful');
    }

    //Re-populate the list after creating an assignment(this is to reflect the changes on a new list)
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






function main(){
    //Get the reports from local storage
    let reports=JSON.parse(localStorage.getItem('reports'))||[];
    populateReportsList(reports);
}

main();
setInterval(main,5000);




