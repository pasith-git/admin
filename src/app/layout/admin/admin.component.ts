import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { PackageService } from 'src/app/services/package.service';
import { ResourcesService } from 'src/app/services/resources.service';
import { PackageBlockContentComponent } from 'src/app/utilComponents/package-block-content/package-block-content.component';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  constructor(public resourcesService: ResourcesService, private router: Router, private route: ActivatedRoute, private location: Location, private packageService: PackageService) {
    const url_state: any = this.location.getState();
    if ('package' in url_state) {
      this.packageService.open(PackageBlockContentComponent);
    }
    this.router.events.subscribe(e => {
      if (e instanceof NavigationEnd) {
        this.resourcesService.getResources();
      }
    })
  }

  ngOnInit(): void {
  }
}
