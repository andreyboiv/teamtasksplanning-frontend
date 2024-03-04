import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef} from "@angular/material/dialog";
import {Category} from "../../../../../model/Category";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf, NgStyle} from "@angular/common";
import {RouterLink} from "@angular/router";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {DialogResult} from "../../../../../object/DialogResult";
import {DialogAction} from "../../../../../object/DialogAction";

@Component({
  selector: 'app-edit-category-matDialogRef',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDialogActions,
    MatDialogContent,
    ReactiveFormsModule,
    RouterLink,
    NgIf,
    MatButton,
    NgStyle,
    MatIcon,
    MatIconButton
  ],
  templateUrl: './edit-category-dialog.component.html',
  styleUrl: './edit-category-dialog.component.css'
})
export class EditCategoryDialogComponent implements OnInit {

  newCategoryForm!: FormGroup;
  error: string | undefined;
  private formBuilder: FormBuilder = new FormBuilder();

  category: Category | undefined;

  private dialogTitle: string | undefined;
  private canDelete = false;

  constructor(private matDialogRef: MatDialogRef<EditCategoryDialogComponent>,
              @Inject(MAT_DIALOG_DATA) private data: [Category, string]) {
  }

  ngOnInit(): void {
    this.newCategoryForm = this.formBuilder.group({
      "category": new FormControl("", [Validators.required]),
    })
  }

  getNewCategory() {
    return this.newCategoryForm.get('category');
  }

  setNewCategory(str: String) {
    return this.newCategoryForm.get('category')?.setValue(str);
  }

  cancelClick = () => this.matDialogRef.close(new DialogResult(DialogAction.CANCEL));
  okClick = () => {

    if (!this.getNewCategory()?.value) {
      return;
    }

    this.category = this.data[0];
    this.category.title = this.getNewCategory()?.value;
    this.dialogTitle = this.data[1];

    this.matDialogRef.close(new DialogResult(DialogAction.SAVE, this.category))

  }

}
