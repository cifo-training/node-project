import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  isError = false;
  error401 = false;


  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required]]
    });
  }
  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }
  ngOnInit() {
  }
  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.log(this.loginForm.value);

    return this.authService.loginUser$(this.email.value, this.password.value)
      .subscribe(
        data => {
          /*           this.authService.setUser(data.user); */
          const token = data.token;
          this.authService.setToken(token);
          console.log('token', token);
          // this.router.onSameUrlNavigation = 'reload';
          // this.router.navigate(['/']);
          this.router.navigate(['/home']);


          this.isError = false;
        },
        error => {
          console.log('error::: ',error.status);
          this.error401 = true;
          this.onIsError();
        }
      );

  }
  onIsError(): void {
    this.isError = true;
    setTimeout(() => {
      this.isError = false;
    }, 4000);
  }
}
