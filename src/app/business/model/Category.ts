import {Employee} from "../../auth/model/Employee";

export class Category {
  id: number | null | undefined;
  title: string | null | undefined;
  completedCount: number | undefined;
  uncompletedCount: number | undefined;
  employeesToCategory: Employee | undefined;

  constructor(id: number | null, title: string, user: Employee | undefined, completedCount?: number, uncompletedCount?: number) {
    this.id = id;
    this.title = title;
    this.completedCount = completedCount;
    this.uncompletedCount = uncompletedCount;
    this.employeesToCategory = user;
  }
}
