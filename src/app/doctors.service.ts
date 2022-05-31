import { Injectable } from '@angular/core';
import { Observable,of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DoctorsService {

  constructor(
    private http:HttpClient
  ) { }

//* error handlers
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      
  
      // TODO: better job of transforming error for user consumption
       console.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  list:any=[]

  //* array holding created doctor
  doctor?:any={}

  //* subject for the created doctor
  private newDoctor = new BehaviorSubject(this.doctor)

  additionalDoctor = this.newDoctor.asObservable()

  
  //* fetches the doctors from the api
  getDoctors():Observable<any>{
    return this.http.get('https://jsonplaceholder.typicode.com/users')
    .pipe(
      catchError(this.handleError<any>('getDoctors', []))
    )
  }

  //* adds the doctor to a the main doctors list
  addDoctor(item:any):void{
    this.doctor=item
    this.newDoctor.next(this.doctor)

  }
}
