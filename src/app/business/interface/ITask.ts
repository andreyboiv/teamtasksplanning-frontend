import {ICommon} from './ICommon';
import {Observable} from 'rxjs';
import { Task } from '../model/Task';
import {TaskSearchValues} from "../search/TaskSearchValues";

export interface ITask extends ICommon<Task> {
    findTasks(taskSearchValues: TaskSearchValues): Observable<Task[]>;
}
