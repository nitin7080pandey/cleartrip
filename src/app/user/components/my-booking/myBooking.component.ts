import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/login/services/login.service';
import { User } from '../../model/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-my-booking',
  templateUrl: './myBooking.component.html',
  styleUrls: ['./myBooking.component.css']
})
export class MyBookingComponent {


  constructor(private router: Router, public loginService: LoginService, public userService: UserService) {
  }

  ngOnInit() {
    this.userService.getMyBookingList();
  }

}
