import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';
// import * as validators from 'src/app/shared/classes/validators';
import { ValidatorsService } from 'src/app/shared/services/validators.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public registerForm: FormGroup;
  public formValid = false;
  isError = false;
  get email() { return this.registerForm.get('email'); }
  get name() { return this.registerForm.get('name'); }
  get password() { return this.registerForm.get('password'); }
  get password2() { return this.registerForm.get('passwordConfirm'); }
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, validators: ValidatorsService) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      name: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      passwordConfirm: ['', [Validators.required, validators.match('password')]]
    });
  }

  ngOnInit() {
  }

  registerUser() {
    console.log(this.registerForm.value);
    return this.authService.registerUser$(this.name.value, this.email.value, this.password.value).subscribe(
      data => {
        /*           this.authService.setUser(data.user); */
        console.log(data);
        const token = data.accessToken;
        this.authService.setToken(token);
        // this.router.onSameUrlNavigation = 'reload';
        // this.router.navigate(['/']);
        this.router.navigate(['login']);
        this.isError = false;
      },
      error => {
        console.log(error);
        this.onIsError(error); }
    );
  }
  onSubmit() {
    this.registerUser() ;
  }
  onIsError(err): void {
    this.isError = true;
    console.log(err.error.message);
    setTimeout(() => {
      this.isError = false;
    }, 4000);
  }

}
