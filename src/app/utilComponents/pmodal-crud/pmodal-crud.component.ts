import { AfterContentInit, Component, ContentChild, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, TemplateRef } from '@angular/core';
@Component({
  selector: 'pmodal-crud',
  templateUrl: './pmodal-crud.component.html',
  styleUrls: ['./pmodal-crud.component.css']
})
export class PmodalCrudComponent implements OnInit, OnChanges, AfterContentInit {
  @Input() modalDisplay: boolean;
  @Input() modalEditDisplay: boolean;
  @Input() modalHeaderName: string;
  @Input() clIcon: string;
  @Input() clText: string;
  @Input() modalDefault: boolean;
  @Input() imagePath: string;
  @Output() modalHide = new EventEmitter<boolean>();
  @ContentChild('body', { static: false }) body: TemplateRef<any>;
  constructor() { }
  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
  }
  onHide(e: any) {
    this.modalHide.emit(e);
  }
  onClose(bool: boolean) {
    this.modalHide.emit(bool);
  }
  ngAfterContentInit(): void {
  }
}
;