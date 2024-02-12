import {ICommon} from './ICommon';
import {Observable} from 'rxjs';
import {Priority} from "../model/Priority";
import {PrioritySearchValues} from "../search/PrioritySearchValues";

export interface IPriority extends ICommon<Priority> {
    findPriorities(prioritySearchValues: PrioritySearchValues): Observable<Priority[]>;
}
