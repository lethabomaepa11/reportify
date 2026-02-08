class department {
    constructor(id, name, assignments) {
        this._id = id;
        this._name = name;
        this._assignments = assignments;
    }

    get id() {
        return this._id;
    }

    get name() {
        return this._name;
    }   

    get assignments() {
        return this._assignments;
    }


    completeAssignment(assignment) {
        assignment.status = 'Complete'
    }

    rejectAssignment(assignment) {
        assignment.status = 'Rejected'
    }   


    
}


class Assignment{
        constructor(id, report_id, department_id, title, created_at, status) {
            this._id = id;
            this._report_id = report_id;
            this._department_id = department_id;
            this._title = title;
            this._created_at = created_at;
            this._status = status;
        }   

    }


    /* 
    Assignment{
      id: string;
      report_id:string;
      department_id:string;
      title: string;
      created_at: datetime;
      status:string;
  }
    */

    //dummy assignment for testing 

    //create multiple arrays for dummy assignments for each department
    const dummyAssignments = [
        new Assignment('1', '101', '201', 'Assignment 1', '2024-06-01', 'Pending'),
        new Assignment('2', '102', '201', 'Assignment 2', '2024-06-02', 'Pending'),
        new Assignment('3', '103', '201', 'Assignment 3', '2024-06-03', 'Pending')
    ];

    const dummyAssignments2 = [
        new Assignment('4', '104', '202', 'Assignment 4', '2024-06-04', 'Pending'),
        new Assignment('5', '105', '202', 'Assignment 5', '2024-06-05', 'Pending'),
        new Assignment('6', '106', '202', 'Assignment 6', '2024-06-06', 'Pending')
    ];

    const dummyAssignments3 = [
        new Assignment('7', '107', '203', 'Assignment 7', '2024-06-07', 'Pending'),
        new Assignment('8', '108', '203', 'Assignment 8', '2024-06-08', 'Pending'),
        new Assignment('9', '109', '203', 'Assignment 9', '2024-06-09', 'Pending')
    ];

    //create an array of departments with dummy assignments of at least 3 assingments each
    const departments = [
        new department('201', 'Department A', dummyAssignments),
        new department('202', 'Department B', dummyAssignments2),
        new department('203', 'Department C', dummyAssignments3)
    ];


    

