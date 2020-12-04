import { Component, ElementRef, ViewChild } from '@angular/core';
import { ApiService } from '../api.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  @ViewChild('signUp') public signUpElement: ElementRef;
    public name= ''
    public email= ''
    public password= ''
  public signUpError = {
    name: '',
    email: '',
    password: '',
  };
  constructor(public apiService: ApiService) { }

  ngOnInit(): void {
  }

  public signUpSubmit() {
    let toggle = true
    let arr = ['name','email','password']
    arr.map((key)=>{
     if(!this[key]){
      toggle= false
       this.signUpError[key] = `please enter the Value`
     } else {
      this.signUpError[key] = ''
     }
    })
    if(!/\w*@\w*\.\w*/gmi.test(this.email)){
      toggle =false
      this.signUpError.email = `please enter the vaild email` 
    }
    if(toggle){
      this.apiService.signUp({
        name:this.name,
        email:this.email,
        password: this.password
      }).subscribe((res)=>{
        if(res && res['success']){
          this.signUpElement.nativeElement.click();
        }
      })
    }
  }

}
