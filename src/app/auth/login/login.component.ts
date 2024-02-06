import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService, User} from "../service/authservice/auth.service";
import {Router, RouterLink} from "@angular/router";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule, NgIf, RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrl: '../auth.component.scss'
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  responseMessage: string | undefined;
  error: string | undefined;
  firstSubmitted = false;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      "login": new FormControl("", [Validators.required, Validators.minLength(6)]),
      "password": new FormControl("", [Validators.required, Validators.minLength(8)])
    })
  }


  submitAuthorisationForm() {
    this.firstSubmitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    const tmpUser = new User();
    tmpUser.login = this.getLogin()?.value;
    tmpUser.password = this.getPassword()?.value;
    this.authService.login(tmpUser).subscribe({
        next: (responseMessage) => {
          this.error = '',
          this.responseMessage = responseMessage,
          console.log('responseMessage: ', responseMessage)
        },
        error: (err) => {
          this.responseMessage = '';
          if (err.status == 0) {
            this.error = 'Der Server antwortet nicht. Probieren Sie später noch mal...';
          } else {
            this.error = err.error == null ? 'Anmeldedaten sind ungültig' : err.error;
              console.log(this.error)
          }
          /*   setTimeout(() => {
               this.error = ''
             }, 5000); */
        }
      }
    );
  }

  public getLogin() {
    return this.loginForm.get('login');
  }

  public getPassword() {
    return this.loginForm.get('password');
  }
}
