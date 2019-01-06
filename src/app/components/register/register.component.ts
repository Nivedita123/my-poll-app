import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Globals } from 'src/app/globals';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public newUserForm: FormGroup
  public md5;
  public successMsg$: string;
  public errorMsg$ : string;

  constructor(
    public fb: FormBuilder,
    public us: UserService,
    public globals: Globals
  ) {
  }

  ngOnInit() {

    this.newUserForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      password: ['']
    });
  }

  registerUser() {

    var require: any;
    var md5 = require('md5');
    this.newUserForm.value.password = md5(this.newUserForm.value.password);

    let created;

    this.us.getUserByEmail(this.newUserForm.value.email).subscribe(
      user => {
        if (user && created == null) {
          this.errorMsg$ = "User with this email already exists!";
          this.successMsg$ = null;
        }
        else {
          created = this.us.addUser(this.newUserForm.value); // Submit student data using CRUD API
          this.newUserForm.reset();  // Reset form when clicked on reset button
          this.successMsg$ = "Account created!! Please login.";
          this.errorMsg$ = null;
        }
      });
  };

}
