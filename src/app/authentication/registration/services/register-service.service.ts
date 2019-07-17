import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, observable } from 'rxjs';
import { Registerdetails } from '../models/register-details';
// import 'rxjs/add/operator/catch';
// import 'rxjs/add/observable/throw';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Headers': '*'
  })
};
@Injectable({
  providedIn: 'root'
})
export class RegisterServiceService {
  registerUrl = 'http://127.0.0.1:8000/api/v1/auth/register/';
  constructor(private http: HttpClient) {
   }
   registerUser(register: Registerdetails): Observable<Registerdetails> {
    return this.http.post<Registerdetails>(this.registerUrl, register);
                    // .catch(this.errorHandler);
   }
  //  errorHandler(error: HttpErrorResponse) {
  //     return Observable.throw(error.message);

  //  }
}
