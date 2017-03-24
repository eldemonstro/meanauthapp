import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';

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

  constructor(private validateService: ValidateService, private flashMessages: FlashMessagesService) { }

  ngOnInit() {
  }

  onRegisterSubmit() {
    const user = {
      name: this.name,
      username: this.username,
      email: this.email,
      password: this.password
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
  }
}
