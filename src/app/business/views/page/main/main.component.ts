import {Component, OnInit} from "@angular/core";
import {Category} from "../../../model/Category";
import {CategoryService} from "../../../services/CategoryService";
import {AuthService} from "../../../../auth/service/authservice/auth.service";
import {User} from "../../../../auth/model/User";
import {CategoriesComponent} from "./categories/categories.component";
import {NgClass, NgIf} from "@angular/common";
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  standalone: true,
  imports: [
    CategoriesComponent,
    NgIf,
    RouterOutlet,
    NgClass
  ],
  styleUrls: ['./main.component.css']
})

export class MainComponent implements OnInit {

  categories: Category[] | undefined | null | any;
  private user: User | null | undefined;

  constructor(private authService: AuthService,
              private categoryService: CategoryService) {
  }

  ngOnInit(): void {
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

}
