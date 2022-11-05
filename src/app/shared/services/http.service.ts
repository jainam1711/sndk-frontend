import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  /**
   * @author Jainam Shah
   * @description Common POST request for sending data to server
   */
  postData(requrl, payload): Observable<any> {
    const url = `${this.apiUrl + requrl}`;
    return this.http.post<any>(url, payload);
  }

}
