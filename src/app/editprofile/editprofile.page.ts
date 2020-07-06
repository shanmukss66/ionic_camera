import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from '../services/behavior.service';
import {Plugins,CameraResultType,CameraSource, Camera} from '@capacitor/core';
import {DomSanitizer,SafeResourceUrl} from '@angular/platform-browser';
import { Router } from '@angular/router';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.page.html',
  styleUrls: ['./editprofile.page.scss'],
})
export class EditprofilePage implements OnInit {
  status;
  a;
  reactive_signup= new FormGroup({
    fname:new FormControl('',Validators.required),
    lname:new FormControl('',Validators.required),
    email:new FormControl('',Validators.required),
    phone:new FormControl('',Validators.required),
    password:new FormControl('',Validators.required),
    gender:new FormControl('',Validators.required)
  })
  photo:SafeResourceUrl
  constructor(private dataservice: DataService,private sanitizer:DomSanitizer,private router:Router,private storageservice:StorageService) { }

  ngOnInit() {
    this.dataservice.data.subscribe(data1 => {
      this.status=data1;
      this.a=this.status;
      if(this.status!=null){
        this.reactive_signup.setValue({
          fname:JSON.parse(localStorage.getItem(this.status)).fname,
          lname:JSON.parse(localStorage.getItem(this.status)).lname,
          phone:JSON.parse(localStorage.getItem(this.status)).phone,
          email:JSON.parse(localStorage.getItem(this.status)).email,
          password:JSON.parse(localStorage.getItem(this.status)).password,
          gender:JSON.parse(localStorage.getItem(this.status)).gender
  
  
        })
      }
      
      
    })
  }
  onclickSubmit(){
    
      localStorage.setItem(this.status,JSON.stringify(this.reactive_signup.value));
    
      this.router.navigate(['/signin']);
    
  }
  async clickPicture(){
  const image= await Plugins.Camera.getPhoto({
    quality:100,
    allowEditing:false,
    resultType:CameraResultType.DataUrl,
    source:CameraSource.Camera,
  })
  this.photo=this.sanitizer.bypassSecurityTrustResourceUrl(image && image.dataUrl);
  }

}
