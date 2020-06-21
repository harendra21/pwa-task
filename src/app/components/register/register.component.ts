import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { AddUserService } from '../../service/user/add-user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public registerForm: FormGroup;
  public dob: NgbDateStruct;
  public date: {year: number, month: number};
  public step = 1;
  public files: any = [];
  public error = false;
  public errorData = '';
  constructor(
    private formBuilder: FormBuilder,
    private calendar: NgbCalendar,
    private addUser: AddUserService,
    private router: Router
    ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      'f_name' : null,
      'l_name' : null,
      'gender': 1,
      'username' : null,
      'email' : null,
      'password' : null,
      'c_password' : null,
      'dob': null,
      'image' : null
    });
  }
  goto(num){
    this.step = num
  }

  uploadFile(event) {
    for (let index = 0; index < event.length; index++) {
      const element = event[index];
      this.files.push(element.name)
    }  
  }
  deleteAttachment(index) {
    this.files.splice(index, 1)
  }
  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.registerForm.get('image').setValue(file);
    }
  }

  submit(value){
    this.error = false;
    if(!this.registerForm.valid){
      this.error = true;
      this.errorData = 'All fields are required.';
      return false;
    }

    const formData = new FormData();
    Object.keys(value).forEach(key => {
      formData.append(key, this.registerForm.get(key).value);
    });
    let dobData = this.registerForm.get('dob').value;
    let date = dobData.year+'-'+dobData.month+'-'+dobData.day;
    formData.append('date', date);
    this.addUser.add_user(formData).subscribe((data : any) => {
      if(!data.status){
        this.error = true;
        this.errorData = data.msg;
      }else{
        this.router.navigate(['/login']);
      }
        
    },err =>{
      console.log(err);
    })
    
  }


}
