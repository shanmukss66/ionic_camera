import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
   reactive_signup= new FormGroup({
     fname:new FormControl('',Validators.required),
     lname:new FormControl('',Validators.required),
     email:new FormControl('',Validators.required),
     phone:new FormControl('',Validators.required),
     password:new FormControl('',Validators.required),
     con_password:new FormControl('',Validators.required),
     gender:new FormControl('',Validators.required)
   })
  constructor(private router:Router) { }

  ngOnInit() {
  }
  onclickSubmit(){
    localStorage.setItem(this.reactive_signup.get('email').value,JSON.stringify(this.reactive_signup.value));
    this.router.navigate(['/signin']);
  }

}
