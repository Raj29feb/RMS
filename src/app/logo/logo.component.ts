import { Component, Input, OnInit } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

interface logoStyleInterface {
  width: string;
  height: string;
  display: string;
  justifyContent: string;
  fontSize: string;
  margin: string;
  fontWeight: string;
  border: string;
  color: string;
}

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss'],
})
export class LogoComponent implements OnInit {
  logo = 'rms';
  @Input() logoStyle!: logoStyleInterface;
  styles = new BehaviorSubject({});

  ngOnInit(): void {
    this.styles.next(this.logoStyle);
  }
}
