import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingpageComponent } from './pages/landingpage/landingpage.component';
import { CardapioComponent } from './pages/cardapio/cardapio.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { AboutComponent } from './pages/about/about.component';
import {EdicaoItensComponent} from 'src/app/pages/edicao-itens/edicao-itens.component'
import {ExclusaoItensComponent} from 'src/app/pages/exclusao-itens/exclusao-itens.component'
import { AuthGuard } from 'src/app/guards/auth.guard';

const routes: Routes = [
  { path: '', component: LandingpageComponent },
  { path: 'cardapio', component: CardapioComponent},
  { path: 'login', component: LoginComponent },
  { path: 'gerenciador', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'editar-itens', component: EdicaoItensComponent, canActivate: [AuthGuard] },
  { path: 'excluir-itens', component: ExclusaoItensComponent, canActivate: [AuthGuard] },
  { path: 'about', component: AboutComponent },
  { path: '**', redirectTo: 'cardapio' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
