import { Component, ElementRef, ViewChild, OnInit,} from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TemplateformComponent } from './templateform/templateform.component';





@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CommonModule,RouterLink,FormsModule],
  providers: [
    
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  preserveWhitespaces:true
  
  
  
  
})
export class AppComponent implements OnInit{  //read and display data
  @ViewChild('myModal') model:ElementRef | undefined;  //anotherway display modelpop
  studentObj:Student =new Student();   //create obj for Studentclass
  studentList:Student[]=[];   // read localstorage data and store into a variable

  
  ngOnInit(): void {
    const localData=localStorage.getItem('angular17crud');  //on pageload read the data
    if(localData != null){   //if we don't have localstorage we can not do the operation
this.studentList=JSON.parse(localData);  //store data into studentList
    }
  }
 
  openModel(){ //create for model pop open---
    // this.studentObj=new Student(); // when create new data same data will display so i write code
    const model= document.getElementById("myModal");  //modelname defind in html model
    if(model != null){
      model.style.display='block'
    }
  }
  closeModel(){
    this.studentObj=new Student(); //intialize the close model popop
    if(this.model != null){      //closemodel
    this.model.nativeElement.style.display ='none';
  }
}
onDelete(_item:Student){
const isDelete=confirm("Are You Sure Want To Delete");
if(isDelete){
  const currentRecord=this.studentList.findIndex(m=> m.id === this.studentObj.id);// find the index,delete the record we have to use find index method
  this.studentList.splice(currentRecord,1) //finindex method we acn use with the splice method of array, only 1 record removed
  localStorage.setItem('angular17crud',JSON.stringify(this.studentList)); // store the update record
}
}
onEdit(item:Student){ // Student datatype
this.studentObj=item; //stotre data in studentobj
this.openModel();  //open model popop
}

updateStudent(){
  const currentRecord=this.studentList.find(m=> m.id === this.studentObj.id);  //1.read the current record whatever data inserted from my array
  if(currentRecord != undefined){
    currentRecord.name=this.studentObj.name;
    currentRecord.address=this.studentObj.address;
    currentRecord.MobileNo=this.studentObj.MobileNo;
    currentRecord.city=this.studentObj.city;
    currentRecord.email=this.studentObj.pincode;
    currentRecord.state=this.studentObj.state;
    
  };
  localStorage.setItem('angular17crud',JSON.stringify(this.studentList)) //again push to loaclstorage
  this.closeModel(); //then close the model popop
}
saveStudent(){
  //debugger;
  const isLocalPresent= localStorage.getItem("angular17crud"); //checking data present or not
  if(isLocalPresent !=null){
    
const oldArray=JSON.parse(isLocalPresent); //1.String to Array
this.studentObj.id=oldArray.length+1; //check length & everytime a new id be there
oldArray.push(this.studentObj); //2.push to localstorage
this.studentList=oldArray;  //after forloop push object to display data
localStorage.setItem('angular17crud',JSON.stringify(oldArray)) //3.store data to Localstorage
  }
  else{
    const newArr=[]; // 1.create empty Array
    newArr.push(this.studentObj);   //2.push to localstorage
    this.studentObj.id=1; //if we inserting for 1st time intialize with 1
    this.studentList=newArr;   //after forloop push object to display data
    localStorage.setItem('angular17crud',JSON.stringify(newArr)) //3.store data to localstorage,Array to String Format 
  }
  this.closeModel(); //after save modelpopup closed
}
}

export class Student{
  id:number;  //bcz to edt i need something unique,name may be same
  name:string;
  MobileNo:string;
  email:string;
  city:string;
  state:string;
  pincode:string;
  address:string;

  constructor(){
    this.id=0;
this.address='';
this.city='';
this.state=''
this.email='';
this.MobileNo='';
this.name='';
this.pincode='';
  }
}

