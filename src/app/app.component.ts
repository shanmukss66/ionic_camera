import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { DataService } from './services/behavior.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit{
  hide_settings=true; 
  hide_signup=false;
  fullname:string="User Unknown";
  status;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private dataservice: DataService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
  ngOnInit(): void {
    this.dataservice.data.subscribe(data1 => {
      this.status=data1;
      console.log(this.status);
      
      if(this.status!=null){

        this.hide_settings=false;
        this.hide_signup=true;
        this.fullname=JSON.parse(localStorage.getItem(this.status)).fname+" "+JSON.parse(localStorage.getItem(this.status)).lname;
      }
      else{
        this.hide_settings=true; 
        this.hide_signup=false;
      }
    })
  }
}
