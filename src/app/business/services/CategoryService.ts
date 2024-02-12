import {Inject, Injectable, InjectionToken} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CommonService} from './CommonService';
import {ICategory} from '../interface/ICategory';
import {Observable} from 'rxjs';
import {Category} from "../model/Category";
import {CategorySearchValues} from "../search/CategorySearchValues";

export const CATEGORY_URL_TOKEN = new InjectionToken<string>('url');

@Injectable({
  providedIn: 'root'
})

export class CategoryService extends CommonService<Category> implements ICategory {
  constructor(@Inject(CATEGORY_URL_TOKEN) private baseUrl: string, private http: HttpClient) {
    super(baseUrl, http);
  }

  findCategories(categorySearchValues: CategorySearchValues): Observable<Category[]> {
    return this.http.post<Category[]>(this.baseUrl + '/search', categorySearchValues);
  }
}
