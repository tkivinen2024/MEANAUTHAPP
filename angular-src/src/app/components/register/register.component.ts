import { Component, OnInit } from '@angular/core';
import {ValidateService} from '../../services/validate.service';

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

  constructor(private validateService: ValidateService) { }

  ngOnInit() {
  }
  onRegisterSubmit(){
    console.log('**1');
    console.log(this.name);
    console.log(this.username);
    console.log(this.email);
    console.log(this.password);

    console.log('**2');
    const user = {
      name: this.name,
      email: this.email,
      username: this.username,
      password: this.password
    }
    console.log('**3');
    // Required fields
    if(!this.validateService.validateRegister(user)) {
      console.log('**3b');
      console.log('Please in fill all fields');
      return false;
    }
    console.log('**4');
    // Required Email
    if(!this.validateService.validateEmail(user.email)) {
      console.log('**4b');
      console.log('Please use a valid email');
      return false;
    }
    console.log('**5');
  }
}
