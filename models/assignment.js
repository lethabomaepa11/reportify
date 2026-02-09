class Assignment{
    constructor(report_id,department_id){
        this.id=Math.floor(Math.random()*1000);
        this.report_id=report_id;
        this.department_id=department_id;
        this.created_at=Date.now();
        this.status='Incomplete';
    }

    
}


export default Assignment;