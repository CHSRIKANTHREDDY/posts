import { Component, ElementRef, ViewChild } from '@angular/core';
import { ApiService } from './api.service';
import { CommonService } from './common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  @ViewChild('login') public loginElement: ElementRef;
 
  @ViewChild('addPost') public addPostElement: ElementRef;

  public email=''
  public password=''
  public loginError = {
    email: '',
    password: '',
  };
  public signUp = {
    name: '',
    email: '',
    password: '',
  };
  public signUpError = {
    name: '',
    email: '',
    password: '',
  };

   public post=''
  public addPostError = {
    post: '',
  };
  public postLists = []
  constructor(public apiService: ApiService, public commonService: CommonService) {
    this.getPosts()
  }
  public getPosts(){
    this.apiService.getPosts().subscribe((res)=>{
      if(res){
        console.log("qda",res)
        this.commonService.setPostList(res['data'])
      }
    })
  }

  public loginSubmit() {
      let toggle = true
      let arr = ['email','password']
      arr.map((key)=>{
       if(!this[key]){
        toggle= false
         this.loginError[key] = `please enter the Value`
       } else {
        this.loginError[key] = ''
       }
      })
      if(!/\w*@\w*\.\w*/gmi.test(this.email)){
        toggle =false
        this.loginError.email = `please enter the vaild email` 
      }
      if(toggle){
        this.apiService.login({
          email:this.email,
          password: this.password
        }).subscribe((res)=>{
          if(res && res['success']){
            this.commonService.setUserDetails(res['data'])
            this.loginElement.nativeElement.click();
          }
        })
      }
  }

  public addPostSubmit() {
    let toggle = true
      if(!this.post){
        toggle =false
        this.addPostError.post = `please enter the vaild email` 
      }
      if(toggle){
        this.apiService.addPost({
          post: this.post,
          userId: this.commonService.userDetails._id,
          commentId: []
        }).subscribe((res)=>{
          if(res && res['success']){
            this.commonService.setUserDetails(res['data'])
            this.loginElement.nativeElement.click();
          }
        })
      }
  }
}
