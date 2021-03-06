import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, DocumentChangeAction, Query} from '@angular/fire/firestore';
import {AuthService} from '../auth/auth.service';
import {AccountsService} from '../accounts/accounts.service';
import {IAccountTotal} from '../../models/account-total';
import {ITransaction} from '../../models/transaction';
import OrderByDirection = firebase.firestore.OrderByDirection;
import {Observable} from 'rxjs';
import {map, switchMap, take} from 'rxjs/operators';
import {IAccount} from '../../models/account';
import {IPeriod} from '../../models/period';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PeriodSummaryService {

  constructor(private afs: AngularFirestore, private authService: AuthService, private http: HttpClient) { }

  getTotalRealized(date: Date) {
    return this.authService.getCurrentUserObservable().pipe(take(1), switchMap(res => {
      const headersWithUser = new HttpHeaders({'user': res.uid});
      return this.http.get(`https://us-central1-minimalist-money.cloudfunctions.net/getTotalRealized?date=${date}`,
        {headers: headersWithUser});
    }));
  }
}
