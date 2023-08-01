import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
	selector: 'app-studencrud',
	templateUrl: './studencrud.component.html',
	styleUrls: ['./studencrud.component.css']
})
export class StudencrudComponent {
	StudentArray : any[] = [];
	isResultLoaded = false;
	isUpdateFormActive = false;
	
	stname: string = "";
	course: string = "";
	fee: string = "";
	currentStudentID: string = "";

	constructor(private http: HttpClient){
		this.getAllStudent();
	}
	getAllStudent(){
	
		this.http.get("http://localhost:8085/api/student").subscribe((resultData:any)=>{
			this.isResultLoaded = true;
			this.StudentArray = resultData.data;
		})
	}

	register(){
		let bodyData = {
			"stname":this.stname,
			"course":this.course,
			"fee":this.fee
		};
		this.http.put("http://localhost:8085/api/student/add/",bodyData).subscribe((resultData:any)=>{
			alert("Registered")
			this.getAllStudent();
		})
	}

	updateRecords(){
		let bodyData = {
			"stname":this.stname,
			"course":this.course,
			"fee":this.fee
		};
		this.http.put("http://localhost:8085/api/student/update/"+this.currentStudentID,bodyData).subscribe((resultData:any)=>{
			alert("Updatedd")
			this.getAllStudent();
		})
	}

	save(){
		if(this.currentStudentID == ''){
			this.register();
		}else{
			this.updateRecords();
		}
	}

	setUpdate(data:any){
		this.stname = data.stname
		this.course = data.course
		this.fee = data.fee
		this.currentStudentID = data.id;
	}

	setDelete(data:any){
		this.http.delete("http://localhost:8085/api/student/delete/"+data.id).subscribe((resultData:any)=>{
			alert("Remove")
			this.getAllStudent();
		})
	}
}
