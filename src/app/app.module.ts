import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { AppComponent } from './app.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { HTTP_INTERCEPTORS, HttpClientModule } from  '@angular/common/http';
import { RepoItemComponent } from './MyComponents/repo-item/repo-item.component';
import { FormsModule } from '@angular/forms';
import { PaginationComponent } from './MyComponents/pagination/pagination.component';
import { CacheService } from './services/cache.service';
import { CachingInterceptor } from './http-interceptors/http-interceptor';
@NgModule({
  declarations: [
    AppComponent,
    RepoItemComponent,
    PaginationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgxSkeletonLoaderModule,
    HttpClientTestingModule, 
    
  ],
  providers: [CacheService,{
    provide:HTTP_INTERCEPTORS,
    useClass:CachingInterceptor,
    multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
