import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Pack } from '../classes/pack.model';

@Injectable({
  providedIn: 'root'
})
export class ApiPacksService {

  private apiURL = `${environment.API_URL}packs`;
  constructor(private http: HttpClient) { }

  initPack() {
    const pack: Pack = {
      _id: '5dc0b3b3b73fc84c308441ea',
      pack: '',
      image: '',
      price: 0,
      locked: false
    };
    return pack;
  }
  getPacks$() {
    const users = this.http.get<Pack>(this.apiURL);
    return users;
  }
  getPack$(id: string) {
    console.log(id);
    const pack = this.http.get<Pack>(`${this.apiURL}/${id}`);
    return pack;
  }
  addPack$(pack: Pack) {
    return this.http.post<Pack>(this.apiURL, pack)
      .pipe(tap((pack: Pack) => console.log(`added Pack: id=${pack}`)),
        catchError(err => {
          console.log(err);
          return throwError(err);
        }));
  }
  deletePack$(id: string) {
    return this.http.delete(`${this.apiURL}/${id}`);
  }
  editPack$(pack: Pack) {
    return this.http.put<Pack>(`${this.apiURL}/${pack._id}`, pack)
      .pipe(tap((pack: Pack) => console.log(`edited Packs: id=${pack._id}`)),
        catchError(err => {
          console.log(err);
          return throwError(err);
        }));
  }

}
