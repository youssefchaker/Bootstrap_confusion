import { Injectable } from '@angular/core';
import {Leader} from '../shared/leader';
import {LEADERS} from '../shared/leaders';
import { of,Observable} from 'rxjs';
import { delay} from 'rxjs/operators';
import { ProcessHTTPmsgService} from './process-httpmsg.service';
import { HttpHeaders} from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { map , catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor(private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPmsgService) { }

getLeaders(): Observable<Leader[]> {
  return this.http.get<Leader[]>(baseURL + 'leaders')
    .pipe(catchError(this.processHTTPMsgService.handleError));
}

getLeader(id: number): Observable<Leader> {
  return this.http.get<Leader>(baseURL + 'leaders/' + id)
    .pipe(catchError(this.processHTTPMsgService.handleError));
}

getFeaturedLeader(): Observable<Leader> {
  return this.http.get<Leader[]>(baseURL + 'leaders?featured=true').pipe(map(Leaders => Leaders[0]))
    .pipe(catchError(this.processHTTPMsgService.handleError));
}

getLeaderIds(): Observable<number[] | any> {
  return this.getLeaders().pipe(map(leaders => leaders.map(leader => leader.id)))
    .pipe(catchError(error => error));
}
putLeader(leader: Leader): Observable<Leader> {
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };
  return this.http.put<Leader>(baseURL + 'leaders/' + leader.id, leader, httpOptions)
    .pipe(catchError(this.processHTTPMsgService.handleError));
}



}
