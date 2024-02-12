import {User} from "../../auth/model/User";

export class Category {
  id: number;
  title: string;
  completedCount: number | undefined;
  uncompletedCount: number | undefined;
  user: User;

  constructor(id: number, title: string, user: User, completedCount?: number, uncompletedCount?: number) {
    this.id = id;
    this.title = title;
    this.completedCount = completedCount;
    this.uncompletedCount = uncompletedCount;
    this.user = user;
  }
}
