import { Component, OnInit } from '@angular/core';
import { AddUserService } from '../../service/user/add-user.service';
import { UserAuthService } from '../../service/auth/user-auth.service';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public users;
  public signs;
  public storage_url = environment.storage_url;
  public name = null;
  public gender = null;
  public sun_sign = null;
  public showFilter = false;
  constructor(
    private userService : AddUserService,
    private router: Router,
    private auth: UserAuthService
    ) { }

  ngOnInit() {
    this.get_users()
  }

  get_users(){
    var filters = {name : this.name,gender : this.gender,sun_sign: this.sun_sign};
    this.userService.get_users(filters).subscribe((data : any) => {
      if(data.status){
        var respData = data.data;
        this.users = respData.users;
        this.signs = respData.signs;
      }
    },err => {
      if(err.status == 401){
        this.router.navigate(['/login']); 
      }
    })
  }

  filter(type,value){

    if(type == 'name'){
      this.name = value
    }
    else if(type == 'gender'){
      this.gender = value
    }
    else if(type == 'sun_sign'){
      this.sun_sign = value
    }

    this.get_users()
    
  }

  logout(){
    this.auth.logout().subscribe((data : any) => {
      if(data.status){
        sessionStorage.removeItem('login')
        this.router.navigate(['/login']); 
      }
    },err => {
      console.log(err);
    });
  }

}
