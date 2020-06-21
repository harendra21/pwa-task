import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient,HttpHeaders,HttpParams} from '@angular/common/http';
import { UserAuthService } from '../auth/user-auth.service';
@Injectable({
  providedIn: 'root'
})
export class AddUserService {
  public base_url = environment.base_url;
  constructor(
    private http: HttpClient,
    private auth : UserAuthService
  ) { }

  add_user(data){
    return this.http.post(this.base_url+'register-user',data);
  }
  login_user(data){
    return this.http.post(this.base_url+'login-user',data);
  }
  get_users(filters){
    let headers = new HttpHeaders().set('Accept', 'application/json');
    var token = this.auth.get_auth_token();
    headers = headers.set('Authorization',token);
    let params = new HttpParams().set('name', filters.name);
    params = params.set('gender',filters.gender);
    params = params.set('sun_sign',filters.sun_sign);
    return this.http.get(this.base_url+'get-users',{ headers,params : params});
  }
}
