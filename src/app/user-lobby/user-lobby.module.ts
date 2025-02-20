import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserLobbyComponent } from './user-lobby.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [UserLobbyComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: UserLobbyComponent,
      },
    ]),
  ],
  exports: [UserLobbyComponent],
})
export class UserLobbyModule {}
