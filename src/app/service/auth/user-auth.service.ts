import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient ,HttpHeaders} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class UserAuthService {
  public base_url = environment.base_url;
  constructor(
    private http: HttpClient
  ) { }

  
  isLoggedIn(){
    var login = sessionStorage.getItem('login')
    if(login != null){
      return true;
    }else{
      
      return false;
    }
  }
  get_auth_token(){
    var login = sessionStorage.getItem('login')
    var loginData = JSON.parse(login);
    return loginData.token_type+' '+loginData.token
  }
  logout(){
    
      let headers = new HttpHeaders().set('Accept', 'application/json');
      var token = this.get_auth_token();
      headers = headers.set('Authorization',token);
      return this.http.get(this.base_url+'logout',{ headers});
    
  }
}
