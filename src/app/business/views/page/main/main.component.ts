import {Component, OnInit, ViewChild} from "@angular/core";
import {Category} from "../../../model/Category";
import {CategoryService} from "../../../services/CategoryService";
import {AuthService} from "../../../../auth/service/authservice/auth.service";
import {Employee} from "../../../../auth/model/Employee";
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

  categories: Category[] | any;
  employee: Employee | any;

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
      employee => {

        this.categoryService.findAll(employee?.login).subscribe(
          categoriesResult => {
            this.employee = employee;
            this.categories = categoriesResult;
          }
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

  addCategory(category: Category) {
    this.categoryService.add(category).subscribe(result => {
      this.categories.push(result);
    })
  }

  editCategory(category: Category) {
    this.categoryService.update(category).subscribe(result => {
      for (let c of this.categories) {
        if (c.id == category.id) {
          c.title = category.title;
          break;
        }
      }
    })
  }

  deleteCategory(category: Category) {
    this.categoryService.delete(category.id).subscribe(result => {
      for (let i = 0; i < this.categories.length ; i++) {
        if (this.categories[i].id == category.id) {
          this.categories.splice(i, 1);
          break;
        }
      }
    })
  }
}
