import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/behavior.service';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {
   reactive_signup=new FormGroup({
    email:new FormControl('',Validators.required),
    password:new FormControl('',Validators.required) 
   })
   credentials;
   status_hide=true;
  constructor(private router: Router, private dataservice: DataService) { }

  ngOnInit() {
  }
  onclickSubmit(){
    this.credentials= JSON.parse(localStorage.getItem(this.reactive_signup.get('email').value))
    if(this.credentials.email===this.reactive_signup.get('email').value && this.credentials.password===this.reactive_signup.get('password').value){
     this.status_hide=true;
     this.router.navigate(['/home']);
     this.dataservice.updatedDataSelection(this.credentials.email);
    }
    else{
      this.status_hide=false;
    }
  }

}
