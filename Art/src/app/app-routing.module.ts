import { NgModule } from '@angular/core';
import { RouterModule, Routes ,} from '@angular/router';
import { LoginComponent } from './components/Auth/login/login.component';
import { RegisterComponent } from './components/Auth/register/register.component';
import { ClientHomeComponent } from './components/pages/client-home/client-home.component';
import { SellerHomeComponent } from './components/pages/seller-home/seller-home.component';
import { SplashComponent } from './components/splash/splash.component';

const routes: Routes = [
  {path:'' ,component:SplashComponent},
  {path:'register',component:RegisterComponent},
  {path:'login',component:LoginComponent},
  {path:'clienthome',component:ClientHomeComponent},
  {path:'sellerhome',component:SellerHomeComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
