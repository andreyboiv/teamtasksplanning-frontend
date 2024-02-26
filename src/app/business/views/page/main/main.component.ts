import {Component, OnInit, ViewChild} from "@angular/core";
import {Category} from "../../../model/Category";
import {CategoryService} from "../../../services/CategoryService";
import {AuthService} from "../../../../auth/service/authservice/auth.service";
import {User} from "../../../../auth/model/User";
import {CategoriesComponent} from "./categories/categories.component";
import {CommonModule} from "@angular/common";
import {RouterOutlet} from "@angular/router";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatListModule} from "@angular/material/list";
import {MatSidenav, MatSidenavModule} from "@angular/material/sidenav";
import {MatToolbarModule} from "@angular/material/toolbar";
import {BreakpointObserver} from "@angular/cdk/layout";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  standalone: true,
  imports: [
    CategoriesComponent,
    CommonModule,
    RouterOutlet,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule
  ],
  styleUrls: ['./main.component.css']
})

export class MainComponent implements OnInit {

  categories: Category[] | undefined | null | any;
  private user: User | null | undefined;

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  isMobile = true;

  constructor(private authService: AuthService,
              private categoryService: CategoryService,
              private observer: BreakpointObserver) {
  }

  ngOnInit(): void {
    this.observer.observe(['(max-width: 800px)']).subscribe((screenSize) => {
      if (screenSize.matches) {
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }
    });

    this.authService.currentUser.subscribe(
      user => {

        this.user = user;

        this.categoryService.findAll(this.user?.login).subscribe(
          categoriesResult =>
            this.categories = categoriesResult
        )
      }
    );
  }

  toggleMenu() {
    if (this.isMobile) {
      this.sidenav.toggle();
    } else {
      this.sidenav.open();
    }
  }

}
