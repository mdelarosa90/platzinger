import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ConversationComponent } from './conversation/conversation.component';
import { ProfileComponent } from './profile/profile.component';
import { MenuComponent } from './menu/menu.component';
import { UserService } from './services/user.service';
import { AuthenticationService} from './services/authentication.service';
import { ConversationService } from './services/conversation.service';
import { SearchPipe } from './pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from '../environments/environment';
import { ImageCropperModule } from 'ngx-image-cropper';
import { RequestService } from './services/request.service';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { RequestComponent } from './modals/request/request.component';
import { ContactComponent } from './contact/contact.component';
import { UserComponent } from './user/user.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule} from '@angular/common/http';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { MessageService } from './services/message.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ConversationComponent,
    ProfileComponent,
    MenuComponent,
    SearchPipe,
    RequestComponent,
    ContactComponent,
    UserComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule ,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    AngularEditorModule,
    HttpClientModule,
    ImageCropperModule,
    NgbModule.forRoot(),
    BootstrapModalModule.forRoot({container: document.body})
  ],
  providers: [
    UserService,
    AuthenticationService,
    ConversationService,
    RequestService,
    MessageService

  ],
  bootstrap: [AppComponent],
  entryComponents: [RequestComponent]
})
export class AppModule { }
