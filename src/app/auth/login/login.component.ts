import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService, User} from "../service/authservice/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  user: User | undefined;
  responseMessage: string | undefined;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      "login": new FormControl("", [Validators.required]),
      "password": new FormControl("", [Validators.required])
    })
  }


  submitForm() {
    const tmpUser = new User();
    tmpUser.login = this.getLogin()?.value;
    tmpUser.password = this.getPassword()?.value;
    this.authService.login(tmpUser).subscribe({
        next: (responseMessage) => {
          this.responseMessage = responseMessage,
          console.log('responseMessage: ', responseMessage)
        },
        complete: () => {
          // TODO eventuell was machen...
          //  console.log('complete')
        },
        error: (err) => {
          if (err.status == 0) {
            this.router.navigate(['/error']);
          } else {
            this.responseMessage = err.error == null ? 'Anmeldedaten sind nicht gültig' : err.error,
            console.log(this.responseMessage)
          }
        }
      }
    );
  }

  private getLogin() {
    return this.loginForm.get('login');
  }

  private getPassword() {
    return this.loginForm.get('password');
  }
}
