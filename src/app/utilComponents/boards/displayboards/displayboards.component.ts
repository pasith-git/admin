import { AfterViewInit, Component, ContentChild, Input, OnChanges, OnInit, SimpleChanges, TemplateRef } from '@angular/core';
import { faStore } from '@fortawesome/free-solid-svg-icons';
import { Branch } from 'src/app/models/restaurants.model';
import { BranchesService } from 'src/app/services/branches.service';
import { ResourcesService } from 'src/app/services/resources.service';
@Component({
  selector: 'displayboards',
  templateUrl: './displayboards.component.html',
  styleUrls: ['./displayboards.component.css']
})
export class DisplayboardsComponent implements OnInit {
  public data = [
    { name: 'ສາຂາ', total: this.branchService.totalBranch, icon: faStore },
  ];
  @ContentChild('pboard') pboard: TemplateRef<any>;
  constructor(private branchService: BranchesService,
    private resourceData: ResourcesService) {
  }

  ngOnInit(): void {
    this.branchService.getData().subscribe({
      next: (data: Branch[]) => {
        this.data[0].total = data.length
      },
    })
  }
}
