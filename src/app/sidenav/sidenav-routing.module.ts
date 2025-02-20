import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SidenavComponent } from './sidenav.component';
import { UserLobbyComponent } from '../user-lobby/user-lobby.component';
import { authGuard } from '../auth.guard';

const routes: Routes = [
  {
    path: '',
    component: SidenavComponent,
    children: [
      {
        path: '',
        redirectTo: 'user-lobby',
        pathMatch: 'full',
      },
      {
        path: 'user-lobby',
        canActivate: [authGuard],
        loadChildren: () =>
          import('../user-lobby/user-lobby.module').then(
            (m) => m.UserLobbyModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SidenavRoutingModule {}
