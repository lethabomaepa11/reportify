//Will comment tommorow


import Assignment from '../models/assignment.js';

localStorage.setItem('assignments', JSON.stringify([]));

//Dummy reports for testing
let reports=[
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


function populateReportsList(reportsList){
    const reportsListUI=document.getElementById('reportsList');

    for(let i=0;i<reportsList.length;i++){
        let listItem=document.createElement('li');
        const itemDivider=document.createElement('hr');
        const assignButton=document.createElement('button');
        const departmentOptions=document.createElement('select');
        assignButton.textContent="Assign";


        //passing the default value of health as department for now, will finsish tommorow
        assignButton.addEventListener('click',()=>assignReport(reportsList[i].id,'health'));
        
        listItem.innerText=`Report Id:${reportsList[i].id}
                                \nTitle: ${reportsList[i].title}
                                \nDescription: ${reportsList[i].description}
                                \nReport date: ${reportsList[i].created_at}
                                \nLong: ${reportsList[i].location['longitude']}
                                  Lat: ${reportsList[i].location['latitude']}`
        ;

        console.log(listItem.textContent);

        reportsListUI.appendChild(listItem);
        reportsListUI.appendChild(departmentOptions);
        reportsListUI.appendChild(assignButton);
        reportsListUI.appendChild(itemDivider);
    }
}




function assignReport(reportId,departmentId){
    let reports=JSON.parse(localStorage.getItem('reports'))||[];
    for(let i=0;i<reports.length;i++){
        if(reports[i].id===reportId){
            let departments=JSON.parse(localStorage.getItem('departments'))||[];
            for(let j=0;j<departments.length;j++){
                if(departments[j].id===departmentId){
                    let assignments=JSON.parse(localStorage.getItem('assignments'));
                    let assignment=new Assignment(reportId,departmentId);
                    //push the new objects
                    assignments.push(assignment);
                    departments[j].assignments.push(assignment);
                    console.warn(departments[j]);
                    
                    //save to local storage
                    localStorage.setItem('departments',JSON.stringify(departments));
                    localStorage.setItem('assignments',JSON.stringify(assignments));
                }
            }

            
        }
    
    }

}






populateReportsList(reports);