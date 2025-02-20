import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  logo = 'rms';
  logoStyle = {
    width: '100px',
    height: '100px',
    display: 'flex',
    justifyContent: 'center',
    fontSize: 'x-large',
    margin: '30px',
    fontWeight: '900',
    border: '2px solid var(--primary-color)',
    color: 'var(--primary-color)',
  };
}
