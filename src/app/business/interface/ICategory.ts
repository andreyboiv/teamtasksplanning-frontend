import {ICommon} from './ICommon';
import {Observable} from 'rxjs';
import {Category} from "../model/Category";
import {CategorySearchValues} from "../search/CategorySearchValues";

export interface ICategory extends ICommon<Category> {
    findCategories(categorySearchValues: CategorySearchValues): Observable<Category[]>;
}
