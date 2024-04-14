import { Injectable } from '@angular/core';
//import { Http, Headers } from '@angular/http';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
//import 'rxjs/add/operator/map';
import { map } from "rxjs/operators";

import{tokenNotExpired} from 'angular2-jwt'



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
  }

  
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


  //registerUser(user): Observable<any> {
  //  let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  //  return this.http.post<any>('http://localhost:3000/users/register', user, httpOptions);
  //}

  authenticateUser(user: { username: String; password: String; }) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.http.post<any>('http://localhost:3000/users/authenticate', user, httpOptions);
  }
  


/* OK-1
  authenticateUser(user: { username: String; password: String; }) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/authenticate', user, {
      headers: headers,
      observe: 'response'
    }).pipe(map((res:HttpResponse<JSON>)=> res));
  }
  */
 // ----------------------------------------------------------
 // ---
 // ----------------------------------------------------------
 /* NS OK
 getProfile() {
  const httpOptions = {
    headers: new HttpHeaders({
      //'Content-Type':  'application/json'
    })
  };
  httpOptions.headers.append('Authorization', this.authToken);
  httpOptions.headers.append('Content-Type', 'application/json');
  this.loadToken();
  return this.http.get<any>('http://localhost:3000/users/profile', httpOptions);
}
*/
  
getProfile() {
  let headers = new HttpHeaders();
  this.loadToken();
  headers.append('Authorization', 'Bearer ' + this.authToken);
  headers.append('Authorization', this.authToken);
  headers.append('Content-Type', 'application/json');
  return this.http.get<any>('http://localhost:3000/users/profile', {headers: headers});
}

/*
getProfile() {
  let headers = new Headers();
  this.loadToken();
  headers.append('Authorization', this.authToken);
  headers.append('Content-Type','application/json');
  return this.http.get('http://localhost:3000/users/profile', {headers: headers})
    .map(res => res.json());
}
*/
loadToken() {
  const token = localStorage.getItem('id_token');
  this.authToken = token;
}

  storeUserData(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  // Timestamp: 12:50 - If the tokenNotExpired() is not working, use tokenNotExpired("id_token")
  loggedIn() {
    //return tokenNotExpired();
    return tokenNotExpired("id_token");
  }


  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
    
}
