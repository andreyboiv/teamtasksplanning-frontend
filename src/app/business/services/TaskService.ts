import {Observable} from 'rxjs';
import {Inject, Injectable, InjectionToken} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {CommonService} from './CommonService';
import {ITask} from '../interface/ITask';
import {Task} from '../model/Task';
import {TaskSearchValues} from "../search/TaskSearchValues";

export const TASK_URL_TOKEN = new InjectionToken<string>('url');

@Injectable({
  providedIn: 'root'
})

export class TaskService extends CommonService<Task> implements ITask {

  constructor(@Inject(TASK_URL_TOKEN) private baseUrl: string, private http: HttpClient) {
    super(baseUrl, http);
  }

  findTasks(searchObj: TaskSearchValues): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/search', searchObj);
  }

}
