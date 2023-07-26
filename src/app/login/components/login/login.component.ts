import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/login/services/login.service';
import { User } from '../../model/user.model';
import { MasterDataService } from 'src/app/_core/master-data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public userid: string = '';
  public password: string = '';

  constructor(private router: Router, private loginService: LoginService, private masterDataService: MasterDataService) {

  }


  public login() {
    if (this.userid && this.password) {
      this.loginService.loggedUser = new User();
      this.loginService.loggedUser.userid = this.userid;
      this.loginService.loggedUser.name = this.userid;
      this.masterDataService.loadMasterData();
      this.router.navigate(['flight-list'], { replaceUrl: true })
    }
  }

}
