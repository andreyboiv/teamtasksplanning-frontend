import {Component, EventEmitter, Inject, Input, Output} from '@angular/core';
import {Category} from "../../../../model/Category";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {RouterOutlet} from "@angular/router";
import {MatButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {EditCategoryDialogComponent} from "./edit-category-dialog/edit-category-dialog.component";
import {Employee} from "../../../../../auth/model/Employee";
import {DialogAction} from "../../../../object/DialogAction";

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterOutlet,
    MatButton,
    MatIcon
  ],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent {

  @Output()
  addCategoryEvent = new EventEmitter<Category>;

  @Output()
  updateCategoryEvent = new EventEmitter<Category>;


  @Input('categories')
  set setCategories(categories: Category[]) {
    this.categories = categories;
  }

  @Input('employeesToCategory')
  set setUser(employee: Employee) {
    this.employee = employee;
  }

  categories: Category[] | undefined;
  private employee: Employee | undefined;
  showEditIConCategoryIcon: boolean | undefined;
  indexCategoryMouseOver: number | undefined;

  constructor(@Inject(MAT_DIALOG_DATA) private data: [Category, string],
              private matDialogBuilder: MatDialog,
              private matDialogRef: MatDialogRef<EditCategoryDialogComponent>) {
  }

  openAddKategorieDialog() {
    this.matDialogRef = this.matDialogBuilder.open(EditCategoryDialogComponent, {
      data: [new Category(null, '', this.employee), "ADD"]
    });

    this.matDialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return;
      }

      if (result.action === DialogAction.SAVE) {
        this.addCategoryEvent.emit(result.obj as Category);
      }

    })
  }

  openUpdateKategorieDialog(category: Category) {
    this.matDialogRef = this.matDialogBuilder.open(EditCategoryDialogComponent, {
      data: [new Category(category.id, category.title, this.employee), "EDIT"]
    });

    this.matDialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return;
      }

      if (result.action === DialogAction.SAVE) {
        this.updateCategoryEvent.emit(result.obj as Category);
      }

    })
  }

  updateEditIconVisible(show: boolean, index: number): void {
    this.showEditIConCategoryIcon = show;
    this.indexCategoryMouseOver = index;
  }


}
