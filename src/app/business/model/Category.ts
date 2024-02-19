import {User} from "../../auth/model/User";

export class Category {
  id: number | null | undefined;
  title: string | null | undefined;
  completedCount: number | undefined;
  uncompletedCount: number | undefined;
  user: User | undefined;

  constructor(id: number | null, title: string, user: User | undefined, completedCount?: number, uncompletedCount?: number) {
    this.id = id;
    this.title = title;
    this.completedCount = completedCount;
    this.uncompletedCount = uncompletedCount;
    this.user = user;
  }
}
