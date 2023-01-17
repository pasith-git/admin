import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { LoadingInterceptor } from "../interceptors/loading.interceptor";
import { RoleInterceptorInterceptor } from "../interceptors/role-interceptor.interceptor";
import { TokenInterceptorInterceptor } from "../interceptors/token-interceptor.interceptor";

export const tokenInterceptorProvider = {
    provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorInterceptor, multi: true
}

export const loadingInterceptorProvider = {
    provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true
}

export const roleInterceptorProvider = {
    provide: HTTP_INTERCEPTORS, useClass: RoleInterceptorInterceptor, multi: true
}