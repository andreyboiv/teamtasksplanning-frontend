export class TaskSearchValues {

  title = '';
  completed: number | undefined;
  priorityId: number | undefined;
  categoryId: number | undefined;

  dateFrom: Date | undefined;
  dateTo: Date | undefined;

  email: string | undefined;
  pageNumber = 0;
  pageSize = 5;

  sortColumn = 'title';
  sortDirection = 'asc';
}
