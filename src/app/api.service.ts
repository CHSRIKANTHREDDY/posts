import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  public login(data){
    return this.httpClient.post(`http://localhost:3000/login`,data);
   }
   public signUp(data){
    return this.httpClient.post(`http://localhost:3000/signUp`,data);
   }
   public addPost(data){
    return this.httpClient.post(`http://localhost:3000/add-post`,data);
   }
   public getPosts(){
    return this.httpClient.get(`http://localhost:3000/get-post`);
   }
   public addComments(data){
    return this.httpClient.post(`http://localhost:3000/add-comments`, data);
   }
   public deleteComments(id){
    return this.httpClient.delete(`http://localhost:3000/delete-comments/${id}`);
   }
}