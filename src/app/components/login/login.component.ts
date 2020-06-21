import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AddUserService } from '../../service/user/add-user.service';
import { UserAuthService } from '../../service/auth/user-auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public date: {year: number, month: number};
  public step = 1;
  public files: any = [];
  public error = false;
  public errorData = '';
  constructor(private formBuilder: FormBuilder,
    private addUser: AddUserService,
    private router: Router,
    private authUser: UserAuthService
    ) {

      if(this.authUser.isLoggedIn()){
        this.router.navigate(["/"]);
      }
      
      
    }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      'email' : null,
      'password' : null
    });
  }

  submit(value){
    this.error = false;
    if(!this.loginForm.valid){
      this.error = true;
      this.errorData = 'All fields are required.';
      return false;
    }

    this.addUser.login_user(value).subscribe((data : any) => {
      if(!data.status){
        this.error = true;
        this.errorData = data.msg;
        return false;
      }else{
        var tokenData = data.data;
        var loginData = {
          'isLoggedIn' : true,
          'token':tokenData.access_token,
          'token_type':tokenData.token_type,
          'expires_at' : tokenData.expires_at
        }
        sessionStorage.setItem('login',JSON.stringify(loginData))
        this.router.navigate(['/']); 
      }
        
    },err =>{
      console.log(err);
    })
    
  }

}
