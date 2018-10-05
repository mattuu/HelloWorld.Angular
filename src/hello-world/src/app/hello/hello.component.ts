import { environment } from './../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-hello',
  templateUrl: './hello.component.html',
  styleUrls: ['./hello.component.css']
})
export class HelloComponent implements OnInit {
  public message: string;

  constructor(
    private _route: ActivatedRoute,
    private _httpClient: HttpClient
  ) {}

  ngOnInit() {
    this._route.queryParamMap.subscribe((params: ParamMap) => {
      let parameters = new HttpParams();

      const name = params.get('name');
      if (name) {
        parameters = parameters.append('name', name);
      }

      this._httpClient
        .get(environment.apiBaseUrl, {
          params: parameters,
          responseType: 'text' as 'text',
          withCredentials: true
        })
        .subscribe((response: string) => {
          this.message = response;
        });
    });
  }
}
