import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
import { PrinterDto } from '../dto/printer.dto';
import { Printer } from '../models/printer.model';
import { Util } from '../utilConstant/index.util';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PrinterService implements OnInit {
  public dataSub$ = new Subject<Printer[]>();
  readonly dataObs$ = this.dataSub$.asObservable();
  constructor(private http: HttpClient, private authService: AuthService,
  ) {
  }

  findAll(brchId: number) {
    return this.http.get<Printer[]>(Util.Api + `printers/${this.authService.getRestaurantId()}/${brchId}`);
  }

  create(data: PrinterDto) {
    return this.http.post<Printer>(Util.Api + `printers`, data);
  }
  update(data: PrinterDto) {
    return this.http.put<Printer>(Util.Api + `printers/update`, data);
  }
  delete(data: PrinterDto) {
    return this.http.put<Printer>(Util.Api + `printers/delete`, data);
  }
  ngOnInit(): void {

  }
}
