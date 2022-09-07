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

  private apiUrl = 'http://localhost:8080/';

  constructor(private http:HttpClient) { }

  readUser():Observable<any>{
    return this.http.get(this.apiUrl + 'list/user', httpOptions);
  }

  updateUser(item:any, modifValues:any):Observable<any>{
    return this.http.put<any>(this.apiUrl + 'save/user/' + item.id, modifValues, httpOptions);
  }

  readProfile():Observable<any>{
    return this.http.get(this.apiUrl + 'list/profile');
  }

  updateProfile(item:any, modifValues:any):Observable<any>{
    return this.http.put<any>(this.apiUrl + 'save/profile/' + item.id, modifValues, httpOptions);
  }

  readExperience():Observable<any>{
    return this.http.get(this.apiUrl + 'list/experience', httpOptions);
  }

  createExperience(item:any):Observable<any>{
    return this.http.post<any>(this.apiUrl + 'new/experience', item, httpOptions)
  }

  updateExperience(item:any, modifValues:any):Observable<any>{
    return this.http.put<any>(this.apiUrl + 'save/experience/' + item.id, modifValues, httpOptions);
  }

  deleteExperience(item:any):Observable<any>{
    return this.http.delete<any>(this.apiUrl + 'delete/experience/' + item.id);
  }

  readEducation():Observable<any>{
    return this.http.get(this.apiUrl + 'list/education');
  }

  createEducation(item:any):Observable<any>{
    return this.http.post<any>(this.apiUrl + 'new/education/', item, httpOptions)
  }

  updateEducation(item:any, modifValues:any):Observable<any>{
    return this.http.put<any>(this.apiUrl + 'save/education/' + item.id, modifValues, httpOptions);
  }

  deleteEducation(item:any):Observable<any>{
    return this.http.delete<any>(this.apiUrl + 'delete/education/' + item.id);
  }

  readSkill():Observable<any>{
    return this.http.get(this.apiUrl + 'list/skill');
  }

  createSkill(item:any):Observable<any>{
    console.log(item);
    return this.http.post<any>(this.apiUrl + 'new/skill/', item)
  }

  deleteSkill(item:any):Observable<any>{
    return this.http.delete<any>(this.apiUrl + 'delete/skill/' + item.id);
  }

  readProject():Observable<any>{
    return this.http.get(this.apiUrl + 'list/project');
  }

  createProject(item:any):Observable<any>{
    return this.http.post<any>(this.apiUrl + 'new/project', item, httpOptions)
  }

  updateProject(item:any, modifValues:any):Observable<any>{
    return this.http.put<any>(this.apiUrl + 'save/project/' + item.id, modifValues, httpOptions);
  }

  deleteProject(item:any):Observable<any>{
    return this.http.delete<any>(this.apiUrl + 'delete/project/' + item.id);
  }

}
