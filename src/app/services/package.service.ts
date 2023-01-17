import { HttpClient } from '@angular/common/http';
import { ApplicationRef, ComponentFactoryResolver, ComponentRef, EmbeddedViewRef, Injectable, Injector, Type } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { PackageBlockContentComponent } from '../utilComponents/package-block-content/package-block-content.component';
import { PackageBlockComponent } from '../utilComponents/package-block/package-block.component';
import { Util } from '../utilConstant/index.util';

@Injectable({
  providedIn: 'root'
})
export class PackageService {
  private dataSource = new BehaviorSubject<boolean>(false);
  public pbObs: Observable<boolean>;
  public data$ = this.dataSource.asObservable();
  packageComponentRef: ComponentRef<PackageBlockComponent>
  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector,
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
  ) {
    this.data$.subscribe({
      next: (data) => {
        localStorage.setItem("expired", data.toString());
      }
    })
  }
  public getSub(data: boolean){
    this.dataSource.next(data);
  }
  private appendToBody() {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(PackageBlockComponent);
    const componentRef = componentFactory.create(this.injector);
    this.appRef.attachView(componentRef.hostView);
    const domElem = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    document.body.appendChild(domElem);

    this.packageComponentRef = componentRef;
  }
  private removeDialogComponentFromBody() {
    this.appRef.detachView(this.packageComponentRef.hostView);
    this.packageComponentRef.destroy();
  }

  public open(componentType: Type<any>) {
    this.appendToBody();

    this.packageComponentRef.instance.childComponentType = componentType;
  }
  public close(){
    this.removeDialogComponentFromBody();
  }
  
  public getData(){
    return this.http.get(Util.Api + 'packages');
  }
}
