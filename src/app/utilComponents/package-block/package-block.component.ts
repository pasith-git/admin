import { AfterViewInit, ChangeDetectorRef, Component, ComponentFactoryResolver, ComponentRef, OnDestroy, OnInit, Type, ViewChild } from '@angular/core';
import { BlockDirective } from 'src/app/directs/block.directive';

@Component({
  selector: 'app-package-block',
  templateUrl: './package-block.component.html',
  styleUrls: ['./package-block.component.css']
})
export class PackageBlockComponent implements OnInit, OnDestroy, AfterViewInit {
  public pb: string | null = localStorage.getItem("expired");
  public componentRef: ComponentRef<any>
  public childComponentType: Type<any>
  constructor(private componentFactoryResolver: ComponentFactoryResolver, private cd: ChangeDetectorRef) { }
  @ViewChild(BlockDirective) adBlock!: BlockDirective;

  ngOnInit(): void {

  }

  ngOnDestroy() {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }

  ngAfterViewInit() {
    this.loadChildComponent(this.childComponentType);
    this.cd.detectChanges();
  }

  loadChildComponent(componentType: Type<any>) {
    if (componentType !== undefined) {
      let componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentType);
      let viewContainerRef = this.adBlock.viewContainerRef;
      viewContainerRef.clear();

      this.componentRef = viewContainerRef.createComponent(componentFactory);
    }
  }



} 
