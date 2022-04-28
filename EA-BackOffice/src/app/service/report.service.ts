import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Report } from '../models/report';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  url = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  getReports(): Observable<Report[]> {
    return this.http.get<Report[]>(this.url + '/reports');
  }
  
  getReport(id: string): Observable<Report> {
    return this.http.get<Report>(this.url + '/reports/' + id);
  }

  deleteReport(id: string): Observable<string> {
    return this.http.delete(this.url + '/reports/' + id, {responseType: 'text'})
  }

  addReport(report: Report): Observable<string> {
    return this.http.post(this.url + '/reports/', report, {responseType: 'text'}) ;
  }

}