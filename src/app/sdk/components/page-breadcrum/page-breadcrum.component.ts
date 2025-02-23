import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-page-breadcrum',
  templateUrl: './page-breadcrum.component.html',
  styleUrls: ['./page-breadcrum.component.scss'],
})
export class PageBreadcrumComponent {
  @Input() breadcrum = '';
}
