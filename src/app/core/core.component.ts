import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subject, takeUntil, tap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../sdk/components/modal/confirm-modal/modal.component';
import { SnackbarService } from '../sdk/services/snackbar/snackbar.service';
import { Router } from '@angular/router';
import { AuthService } from '../sdk/services/auth/auth.service';
import { UserService } from '../sdk/services/user/user.service';

@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.scss'],
})
export class CoreComponent implements OnInit, OnDestroy {
  isExpand$$ = new BehaviorSubject<boolean>(true);
  username$$ = new BehaviorSubject<string | null>(null);
  currentRoute$$ = new BehaviorSubject<string | null>(null);
  private unsubscribe$$ = new Subject();
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
      title: 'restaurants',
      icon: 'restaurant',
      active: true,
    },
    {
      title: 'distances',
      icon: 'home',
      active: false,
    },
    {
      title: 'dishes',
      icon: 'fastfood',
      active: false,
    },
  ];

  constructor(
    private auth: AuthService,
    private userService: UserService,
    private dailog: MatDialog,
    private snackbar: SnackbarService,
    private router: Router
  ) {}
  ngOnDestroy(): void {
    this.unsubscribe$$.next(null);
    this.unsubscribe$$.complete();
  }

  ngOnInit(): void {
    //set the sidebar as per the url param
    const url = this.router.url.split('/')[1];
    //changing the color in the sidebar
    this.navLinks.map((navLink) => {
      if (navLink.title === url) {
        navLink.active = true;
      } else {
        navLink.active = false;
      }
    });
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
        }),
        takeUntil(this.unsubscribe$$)
      )
      .subscribe((response) => {
        if (response) {
          this.style.minWidth = '300px';
        } else {
          this.style.minWidth = '86px';
        }
      });
    this.userService
      .getUsername$()
      .pipe(takeUntil(this.unsubscribe$$))
      .subscribe({
        next: (result) => {
          this.username$$.next(result.data);
        },
        error: (err) => {
          this.snackbar.openSnackBar(true, err.error.message);
          if (err.status === 403) {
            this.router.navigate(['/auth/login']);
            localStorage.clear();
          }
        },
      });
  }

  handleNavigation(navigate: string) {
    this.navLinks.map((navLink) => {
      if (navLink.title === navigate) {
        this.router.navigate([navigate]);
        navLink.active = true;
      } else {
        navLink.active = false;
      }
      return navLink;
    });
  }

  handleLogout() {
    const dialogRef = this.dailog.open(ModalComponent);
    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.unsubscribe$$))
      .subscribe((result) => {
        if (result) {
          this.auth.logout();
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
