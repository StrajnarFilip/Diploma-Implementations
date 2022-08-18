import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PostEditorComponent } from './post-editor/post-editor.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: "posts", component: HomeComponent },
  { path: "post/:id", component: PostEditorComponent },
  { path: "register", component: RegisterComponent },
  { path: "login", component: LoginComponent },
  { path: "**", component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
