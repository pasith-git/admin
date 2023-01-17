import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Language } from '../models/language.model';
import { ApiPath, Util } from '../utilConstant/index.util';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  constructor(private http: HttpClient) {

  }
  getData() {
    return this.http.get<Language[]>(Util.Api + ApiPath.language);
  }
}
