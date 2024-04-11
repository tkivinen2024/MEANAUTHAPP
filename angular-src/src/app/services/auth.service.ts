import { Injectable } from '@angular/core';
//import { Http, Headers } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//import 'rxjs/add/operator/map';
import { map } from "rxjs/operators";


@Injectable()
export class AuthService {
  authToken: any;
  user: any; 

 constructor(private http: HttpClient) { }
 
  registerUser(user) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    //return this.http.post('http://localhost:3000/users/register', user, {headers: headers})
    //  .map(res => res.json());
//    return this.http.post('http://localhost:3000/users/register', user, {headers: headers})
//    .pipe(map(res => res.json()));
    return this.http.post('http://localhost:3000/users/register', user, {headers: headers}).pipe(map((res: any) => res.json));

      

  }
}
