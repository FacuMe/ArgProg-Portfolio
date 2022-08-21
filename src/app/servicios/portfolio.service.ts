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

  readUser():Observable<any>{
    return this.http.get(this.apiUrl + '/persona');
  }

  updateUser(item:any, modifValues:any):Observable<any>{
    return this.http.put<any>(this.apiUrl + '/persona', modifValues, httpOptions);
  }

  readProfile():Observable<any>{
    return this.http.get(this.apiUrl + '/perfil');
  }

  updateProfile(item:any, modifValues:any):Observable<any>{
    return this.http.put<any>(this.apiUrl + '/perfil', modifValues, httpOptions);
  }

  readExperience():Observable<any>{
    return this.http.get(this.apiUrl + '/experiencia_laboral');
  }

  createExperience(item:any):Observable<any>{
    return this.http.post<any>(this.apiUrl + '/experiencia_laboral/', item, httpOptions)
  }

  updateExperience(item:any, modifValues:any):Observable<any>{
    return this.http.put<any>(this.apiUrl + '/experiencia_laboral/' + item.id, modifValues, httpOptions);
  }

  deleteExperience(item:any):Observable<any>{
    return this.http.delete<any>(this.apiUrl + '/experiencia_laboral/' + item.id);
  }

  readEducation():Observable<any>{
    return this.http.get(this.apiUrl + '/educacion');
  }

  createEducation(item:any):Observable<any>{
    return this.http.post<any>(this.apiUrl + '/educacion/', item, httpOptions)
  }

  updateEducation(item:any, modifValues:any):Observable<any>{
    return this.http.put<any>(this.apiUrl + '/educacion/' + item.id, modifValues, httpOptions);
  }

  deleteEducation(item:any):Observable<any>{
    return this.http.delete<any>(this.apiUrl + '/educacion/' + item.id);
  }

  readSkill():Observable<any>{
    return this.http.get(this.apiUrl + '/habilidad');
  }

  createSkill(item:any):Observable<any>{
    return this.http.post<any>(this.apiUrl + '/habilidad/', item, httpOptions)
  }

  deleteSkill(item:any):Observable<any>{
    return this.http.delete<any>(this.apiUrl + '/habilidad/' + item.id);
  }

  readProject():Observable<any>{
    return this.http.get(this.apiUrl + '/proyecto');
  }

  createProject(item:any):Observable<any>{
    return this.http.post<any>(this.apiUrl + '/proyecto/', item, httpOptions)
  }

  updateProject(item:any, modifValues:any):Observable<any>{
    return this.http.put<any>(this.apiUrl + '/proyecto/' + item.id, modifValues, httpOptions);
  }

  deleteProject(item:any):Observable<any>{
    return this.http.delete<any>(this.apiUrl + '/proyecto/' + item.id);
  }

}
