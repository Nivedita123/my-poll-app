import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Globals } from 'src/app/globals';

declare var require: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public existingUserForm: FormGroup;
  public errMsg$: string;

  constructor(
    public fb: FormBuilder,
    public us: UserService,
    public globals: Globals
  ) { 
  }

  ngOnInit() {

    this.existingUserForm = this.fb.group({
      email: [''],
      password: ['']
    });
  }

  loginUser() {

    var md5 = require('md5');
    
    this.us.getUserByEmail(this.existingUserForm.value.email).subscribe(
      user => {
        if (user) {

          // pwd matches
          if (user.password == md5(this.existingUserForm.value.password)) {

            this.errMsg$ = "Login success";
            this.globals.currentUser$ = user;
          }
          else {
            this.errMsg$ = "Incorrect password";
          }
        }
        else {
          this.errMsg$ = "User with this email does not exist!";
        }
      });

  }
}


/**
 * if (user) {

          // pwd matches
          if (user.password == this.existingUserForm.value.password) {

            this.errMsg$ = "Login success";
          }
          else {
            this.errMsg$ = "Incorrect password";
          }
        }
        else {
          this.errMsg$ = "User with this email does not exist!";
        }
 */