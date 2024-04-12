import { Injectable } from '@angular/core';
//import { Http, Headers } from '@angular/http';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
//import 'rxjs/add/operator/map';
import { map } from "rxjs/operators";


@Injectable()
export class AuthService {
  authToken: any;
  user: any; 

 constructor(private http: HttpClient) { }

 // ------------------------------------------
 // ---
 // ------------------------------------------ 
/*
  registerUser(user: { name: String; email: String; username: String; password: String; }) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/register', user, {headers: headers}).pipe(map((res: any) => res.json));
  }
*/

  registerUser(user: { name: String; email: String; username: String; password: String; }) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/register', user, {
      headers: headers,
      observe: 'response'
    }).pipe(map((res:HttpResponse<JSON>)=> res));

/*
  registerUser(user) {
    let headers = new HttpHeaders();
    headers.append('Contet-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/register', user, {
      headers: headers,
      observe: 'response'
    }).pipe(map((res: HttpResponse<JSON>) => res));
  }
*/

    //return this.http.post('http://localhost:3000/users/register', user, {headers: headers}).pipe(map((res: any) => res.json));
  }

  //registerUser(user): Observable<any> {
  //  let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  //  return this.http.post<any>('http://localhost:3000/users/register', user, httpOptions);
  //}

  authenticateUser(user: { username: String; password: String; }) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/authenticate', user, {
      headers: headers,
      observe: 'response'
    }).pipe(map((res:HttpResponse<JSON>)=> res));

  }
        
}
