import { Component, OnInit } from '@angular/core';
import {ValidateService} from '../../services/validate.service';
import {FlashMessagesService} from 'angular2-flash-messages';

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

  constructor(private validateService: ValidateService, private flashMessage: FlashMessagesService) { }

  ngOnInit() {
  }
  onRegisterSubmit(){
    console.log(this.name);
    console.log(this.username);
    console.log(this.email);
    console.log(this.password);

    const user = {
      name: this.name,
      email: this.email,
      username: this.username,
      password: this.password
    }

    // Required fields
    if(!this.validateService.validateRegister(user)) {
      //console.log('Please in fill all fields');
      this.flashMessage.show('Please in fill all fields', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }
    // Required Email
    if(!this.validateService.validateEmail(user.email)) {
      //console.log('Please use a valid email');
      this.flashMessage.show('Please use a valid email', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }
  }
}
