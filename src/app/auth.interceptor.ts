import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpInterceptorFn, HttpHandlerFn } from '@angular/common/http';
import { Observable } from 'rxjs';

// @Injectable()
// export class AuthInterceptor implements HttpInterceptorFn {

//   intercept(req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> {
//     const token = localStorage.getItem('token');

//     console.log("intercept")

//     if (token) {
//       const clonedRequest = req.clone({
//         setHeaders: {
//           Authorization: `${token}`,
//         },
//       });

//       return next(clonedRequest);
//     }

//     return next(req);
//   }
// }

export function authInterceptor(req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');

    console.log("intercept")

    if (token) {
      const clonedRequest = req.clone({
        setHeaders: {
          Authorization: `${token}`,
        },
      });

      return next(clonedRequest);
    }

    return next(req);
  }
