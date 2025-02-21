import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Subject, tap } from 'rxjs';
import { ApiService } from '../api.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../sdk/components/modal/modal.component';
import { SnackbarService } from '../snackbar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit {
  isExpand$$ = new BehaviorSubject<boolean>(true);
  username$$ = new BehaviorSubject<string | null>(null);
  // patners = ['redial', 'Check voice mail', 'disable alerts'];
  logoutText = 'logout';
  style = {
    background: 'var(--primary-color)',
    padding: '20px',
    minWidth: '300px',
    borderRadius: '5px',
  };
  logoStyle = {
    width: '70px',
    height: '70px',
    display: 'flex',
    justifyContent: 'center',
    fontSize: 'large',
    margin: '0px',
    fontWeight: '900',
    border: '2px solid white',
    color: 'white',
  };
  navLinks = [
    {
      title: 'address',
      icon: 'home',
      active: true,
    },
    {
      title: 'restaurants',
      icon: 'restaurant',
      active: false,
    },
    {
      title: 'dishes',
      icon: 'fastfood',
      active: false,
    },
  ];

  constructor(
    private api: ApiService,
    private dailog: MatDialog,
    private snackbar: SnackbarService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isExpand$$
      .pipe(
        tap((response) => {
          response
            ? ((this.logoStyle.width = '70px'),
              (this.logoStyle.height = '70px'),
              (this.logoStyle.fontSize = 'large'))
            : ((this.logoStyle.width = '40px'),
              (this.logoStyle.height = '40px'),
              (this.logoStyle.fontSize = 'small'));
        })
      )
      .subscribe((response) => {
        if (response) {
          this.style.minWidth = '300px';
        } else {
          this.style.minWidth = '86px';
        }
      });
    //get the user info through getUsername API
    this.api.getUsername().subscribe({
      next: (result) => {
        this.username$$.next(result.data);
      },
      error: (err) => {
        this.snackbar.openSnackBar(true, err.error.message);
        if (err.status === 403) {
          this.router.navigate(['login']);
          localStorage.clear();
        }
      },
    });
  }
  handleNavigation(navigate: string) {
    this.navLinks.map((navLink) => {
      if (navLink.title === navigate) {
        navLink.active = true;
      } else {
        navLink.active = false;
      }
      return navLink;
    });
  }
  handleLogout() {
    const dialogRef = this.dailog.open(ModalComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.api.logout();
      }
    });
  }
  toggleSidebar() {
    this.isExpand$$.next(!this.isExpand$$.getValue());
  }
  openDialog() {
    this.dailog.open(ModalComponent);
  }
}
