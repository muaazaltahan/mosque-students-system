import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  standalone: true,
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatTabsModule,]
})
export class AuthComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private _auth: AuthService,
    private router: Router
  ) { }

  signinForm: FormGroup;
  signupForm: FormGroup;
  showSuErrors = false;
  showSiErrors = false;

  ngOnInit(): void {

    if(this._auth.isLoggedIn) {
      this.router.navigate(['/']);
    }

    this.signinForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required]
    });

    this.signupForm = this.fb.group({
      name: [null, [Validators.required, Validators.minLength(5), Validators.maxLength(35)]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(8), Validators.maxLength(30)]],
      password2: [null, Validators.required]
    });
  }

  signup() {
    if(this.signupForm.valid) {
      this._auth.signup(this.signupForm.value)
    } else {
      this.showSuErrors = true;
    }
  }

  signin() {
    if(this.signinForm.valid) {
      this._auth.signin(this.signinForm.value)
    } else {
      this.showSiErrors = true;
    }
  }

  getSuFormError(name: string) {
    return this.signupForm.get(name).invalid;
  }

}
