import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  private apiUrl = 'http://localhost:5000';

  constructor(private http:HttpClient) { }


  obtenerDatos(resource:string):Observable<any>{
    return this.http.get(this.apiUrl + resource);
  }

  deleteItemExperience(item:any):Observable<any>{
    return this.http.delete<any>(this.apiUrl + '/experiencia_laboral/' + item.id);
  }

  addExperience(item:any):Observable<any>{
    console.log(item);
    return this.http.post<any>(this.apiUrl + '/experiencia_laboral/', item, httpOptions)
  }

  updateExperience(item:any, modifValues:any):Observable<any>{
    console.log(item, modifValues);
    return this.http.put<any>(this.apiUrl + '/experiencia_laboral/' + item.id, modifValues, httpOptions);
  }

  deleteItemEducation(item:any):Observable<any>{
    return this.http.delete<any>(this.apiUrl + '/education/' + item.id);
  }

  deleteItemSkill(item:any):Observable<any>{
    return this.http.delete<any>(this.apiUrl + '/skill/' + item.id);
  }

  deleteItemProject(item:any):Observable<any>{
    return this.http.delete<any>(this.apiUrl + '/project/' + item.id);
  }

}
