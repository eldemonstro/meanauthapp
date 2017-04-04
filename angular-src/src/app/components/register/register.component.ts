import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  name: String;
  username: String;
  email: String;
  password: String;
  confirmPassword: String;

  constructor(private validateService: ValidateService,
    private flashMessages: FlashMessagesService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
  }

  onRegisterSubmit() {
    const user = {
      name: this.name,
      username: this.username,
      email: this.email,
      password: this.password,
      confirmPassword: this.confirmPassword
    };

    //Require fields
    if (!this.validateService.validateRegister(user)) {
      this.flashMessages.show('Please fill all fields', { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    }

    //Validate Email
    if (!this.validateService.validateEmail(user.email)) {
      this.flashMessages.show('Use a valid email', { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    }

    //Validate confirmPassword
    if (!this.validateService.validatePassword(user.password, user.confirmPassword)) {
      this.flashMessages.show('Passwords are not equal', { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    }

    //Register User
    this.authService.registerUser(user).subscribe(data => {
      if (data.success) {
        this.flashMessages.show('You are now registered and can log in', { cssClass: 'alert-success', timeout: 3000 });
        this.router.navigate(['/login']);
      } else {
        this.flashMessages.show('Something went wrong', { cssClass: 'alert-danger', timeout: 3000 });
        this.router.navigate(['/register']);
      }
    });
  }
}
