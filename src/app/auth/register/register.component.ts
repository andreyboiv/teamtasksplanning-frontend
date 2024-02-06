import {Component, OnInit} from '@angular/core';
import {NgIf} from "@angular/common";
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators
} from "@angular/forms";
import {Router, RouterLink} from "@angular/router";
import {AuthService, User} from "../service/authservice/auth.service";
import {PatternConstants} from "../../constants/pattern.constants";


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './register.component.html',
  styleUrl: '../auth.component.scss'
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;
  tmpUser: User | undefined;
  responseMessage: string | undefined;
  error: string | undefined;
  firstSubmitted = false;

  private passwordMathValidator: ValidatorFn | null = (
    control: AbstractControl
  ): ValidationErrors | null => {
    return control.value.password === control.value.confirm_password
      ? null
      : { PasswordNoMatch: true };
  };

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {

    this.registerForm = new FormGroup({
      "login": new FormControl("", [Validators.required, Validators.minLength(6)]),
      "email": new FormControl("", [Validators.required, 	Validators.pattern(PatternConstants.EMAIL_PATTERN)]),
      "password": new FormControl("", [Validators.required, Validators.minLength(8)]),
      "confirm_password": new FormControl("", [Validators.required, Validators.minLength(8)]),
    }, this.passwordMathValidator)
  }

  submitRegisterForm() {
    this.firstSubmitted = true;

    if (this.registerForm.invalid) {
      return;
    }

    const tmpUser = new User();
    tmpUser.login = this.getLogin()?.value;
    tmpUser.email = this.getEmail()?.value;
    tmpUser.password = this.getPassword()?.value;
    this.authService.register(tmpUser).subscribe({
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
    return this.registerForm.get('login');
  }

  public getEmail() {
    return this.registerForm.get('email');
  }

  public getPassword() {
    return this.registerForm.get('password');
  }

  public getConfirmPassword() {
    return this.registerForm.get('confirm_password');
  }
}
