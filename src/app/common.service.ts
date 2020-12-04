import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  public userDetails = {
   name:'',
   email:'',
   _id:'',
   postLists:[]
  }
  constructor() { }
  setUserDetails(data){
    this.userDetails.name = data.name
    this.userDetails.email = data.email
    this.userDetails._id = data._id
  }

  setPostList(data){
    this.userDetails.postLists = data
  }
}