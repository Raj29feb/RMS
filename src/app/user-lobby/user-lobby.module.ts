import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserLobbyComponent } from './user-lobby.component';
import { RouterModule } from '@angular/router';
import { SentencePipe } from '../sentence.pipe';
import { SdkModule } from '../sdk/sdk.module';

@NgModule({
  declarations: [UserLobbyComponent],
  imports: [
    CommonModule,
    SdkModule,
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
