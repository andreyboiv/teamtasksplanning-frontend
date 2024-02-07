import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {AuthService} from "../service/authservice/auth.service";
import {ReactiveFormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-activate-account',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, RouterLink],
  templateUrl: './activate-account.component.html',
  styleUrl: '../auth.component.scss'
})
export class ActivateAccountComponent implements OnInit {

  uuid: string | undefined;
  error: string | undefined;

  constructor(private route: ActivatedRoute, private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
        this.uuid = params["uuid"];

        this.authService.activateAccount(this.uuid).subscribe({
            next: (result) => {

              if (result) {
                this.router.navigate(['/info-page', {msg: 'Ihr Account ist erfolgreich aktiviert'}]);
              } else {
                this.router.navigate(['/info-page', {msg: 'Ihr Account ist nicht aktiviert. Probieren Sie noch mal'}]);
              }
            },
            error: (err) => {
              this.router.navigate(['/info-page', {msg: err.error}]);
              console.log(err);
            }
          }
        )
      }
    )
  }
}
