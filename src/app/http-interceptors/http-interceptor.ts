import { Injectable } from "@angular/core";
import { HttpEvent,HttpEventType , HttpHandler , HttpInterceptor , HttpRequest } from "@angular/common/http";
import { Observable , of } from "rxjs";
import { tap } from "rxjs";
import { CacheService } from "../services/cache.service";

@Injectable()
export class CachingInterceptor implements HttpInterceptor{

    constructor(private cacheService: CacheService){

    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if(req.method !== 'GET'){
            return next.handle(req)
        }

        const cachedResponse = this.cacheService.get(this.getCacheKey(req));
        if(cachedResponse){
            return of(cachedResponse);
        }

        return next.handle(req).pipe(
            tap((event:HttpEvent<any>)=>{
                if(event.type === HttpEventType.Response){
                    this.cacheService.put(req.url , event)
                }
            }))
        
    }
    private getCacheKey(req: HttpRequest<any>): string {
        // Include request URL and parameters in the cache key
        return req.urlWithParams;
    }
}