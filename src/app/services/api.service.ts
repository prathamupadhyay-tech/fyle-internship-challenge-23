import { HttpClient,HttpHeaders,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {forkJoin, tap, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { catchError, map, mergeMap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
 private readonly accessToken = environment.gitAccessToken;
  constructor(
    private httpClient: HttpClient
  ) { }

  getUser(githubUsername: string) {
    const headers = new HttpHeaders().set('Authorization', `token ${this.accessToken}`);
    return this.httpClient.get(`https://api.github.com/users/${githubUsername}` ,{headers});
  }
  getRepos(githubUsername: string,page:number, per_page: number) {
    const params = new HttpParams()
      .set('per_page', per_page.toString())
      .set('page', page.toString());
    console.log('Fetching repositories for:', githubUsername);
    const headers = new HttpHeaders().set('Authorization', `token ${this.accessToken}`);
    return this.httpClient.get<any[]>(`https://api.github.com/users/${githubUsername}/repos`,{params,headers}).pipe(
      mergeMap((repos: any[]) => {
        console.log('Fetched repositories:', repos);
        const observables = repos.map(repo => this.getLanguages(repo.languages_url));
        return forkJoin(observables).pipe(
          map((languages: any[]) => {
            repos.forEach((repo, index) => {
              repo.languages = languages[index]; 
            });
            return repos;
          })
        );
      }),
      catchError(error => {
        console.error('Error fetching repositories:', error);
        return throwError(error);
      })
    );
  }
  private getLanguages(languagesUrl: string) {
    const headers = new HttpHeaders().set('Authorization', `token ${this.accessToken}`);
    return this.httpClient.get(languagesUrl ,{headers});
  }
  // implement getRepos method by referring to the documentation. Add proper types for the return type and params 
}
