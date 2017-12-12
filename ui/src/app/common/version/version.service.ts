import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Version } from './version';

import { environment } from '../../../environments/environment';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class VersionService {
  private version: Promise<Version>;

  constructor(private http: HttpClient) { 
    this.init();
  }

  private init(): void {
   this.version = this.http.get('api/version')
      .map(resp => {
        console.log(resp);
        return resp as Version
      })
      .toPromise()
  }

  getBuildSha(): Promise<string> {
    return this.version.then(v => v.build);
  }

  getBuildDate(): Promise<string> {
    return this.version.then(v => v.date);
  }

}
