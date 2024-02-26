import {Component, Input} from '@angular/core';
import {Category} from "../../../../model/Category";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterOutlet],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent {

  @Input('categories')
  set setCategories(categories: Category[]) {
    this.categories = categories;
  }

  categories: Category[] | undefined;

}
