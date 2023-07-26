import { Component, OnInit } from '@angular/core';
import { LoginService } from './login/services/login.service';
import { DatastoreService } from './_core/datastore.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'flightbooking';
  profileFlag: boolean = false;

  constructor(public loginService: LoginService, private datastoreService: DatastoreService, private router: Router) { }

  ngOnInit(): void {
    if (this.loginService.loggedUser) {
      this.router.navigate(['flight-list'], { replaceUrl: true })
    }
    else {
      this.router.navigate(['login'], { replaceUrl: true })

    }

    this.initializeMasterData();
  }

  initializeMasterData() {
    this.datastoreService.getAirtports();

  }

  displayProfile() {
    if (this.profileFlag == true) {
      this.profileFlag = false;
    }
    else {
      this.profileFlag = true;
    }

  }
}
