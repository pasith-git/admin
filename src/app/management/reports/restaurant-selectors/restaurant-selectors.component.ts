import { Component, ContentChild, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import * as _ from 'lodash';
import { Table } from 'primeng/table';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-restaurant-selectors',
  templateUrl: './restaurant-selectors.component.html',
  styleUrls: ['./restaurant-selectors.component.css'],
})
export class RestaurantSelectorsComponent implements OnInit {
  @Input() dataTable: any;
  @Input() col: any;
  @Input() extraData: any;
  @Input() extraCol: any;
  constructor(private route: ActivatedRoute, private router: Router) {
    /* this.getResId = this.authToken.getRestaurantId()
    this.restaurantService.getRestaurantsData(this.getResId).subscribe((data: any) => {
      this.restaurantService.restaurantsSubject.next(data);
      this.loading = true;
      this.resState = true;
    }) */
  }
  @ViewChild('dt', { static: false }) orderTable: Table;
  @ContentChild('extraRow', { static: false }) extraRow: TemplateRef<any>;
  ngOnInit(): void {
   
  }

  resetTable() {
    this.orderTable.reset();
  }
  exportPdf() {
    /*   const doc = new jsPDF();
      const exportCols = this.orderCol.map(data => ({ title: data.header, dataKey: data.field }));
      doc.addFileToVFS('NotoSansLao-Regular.ttf', notoSansLaoRegular);
      doc.addFont('NotoSansLao-Regular.ttf', 'NotoSansLao-Regular', 'normal');
      doc.setFont('NotoSansLao-Regular');
      doc.addFileToVFS('NotoSans-Regular.ttf', notoSansRegular);
      doc.addFont('NotoSans-Regular.ttf', 'NotoSans-Regular', 'normal');
      doc.setFont('NotoSans-Regular');
      autoTable(doc, {
        head: [exportCols],
        headStyles: {
          font: 'NotoSansLao-Regular',
          fontStyle: 'normal',
          fontSize: 6
        },
        body: [
  
        ],
        bodyStyles: {
          font: 'NotoSans-Regular',
          fontStyle: 'normal',
          fontSize: 6
        }
      })
      doc.save('ss.pdf'); */
  }
}
