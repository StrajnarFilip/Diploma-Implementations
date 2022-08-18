import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { PostEditorComponent } from './post-editor/post-editor.component';
import { ImageComponent } from './post/image/image.component';
import { TextComponent } from './post/text/text.component';
import { HyperlinkComponent } from './post/hyperlink/hyperlink.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NewHyperlinkComponent } from './post/new-hyperlink/new-hyperlink.component';
import { NewTextComponent } from './post/new-text/new-text.component';
import { NewImageComponent } from './post/new-image/new-image.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from "@angular/material/input";
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PostCommentSectionComponent } from './post-comment-section/post-comment-section.component'
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatListModule } from '@angular/material/list'

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PostEditorComponent,
    ImageComponent,
    TextComponent,
    HyperlinkComponent,
    NewHyperlinkComponent,
    NewTextComponent,
    NewImageComponent,
    LoginComponent,
    RegisterComponent,
    PostCommentSectionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatCardModule,
    FlexLayoutModule,
    MatListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
