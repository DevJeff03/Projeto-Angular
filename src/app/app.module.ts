import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { LandingpageComponent } from './pages/landingpage/landingpage.component';
import { CardapioComponent } from './pages/cardapio/cardapio.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { AboutComponent } from './pages/about/about.component';
import { CategoryComponent } from './components/category/category.component';
import { CardProdutosComponent } from './components/card-produtos/card-produtos.component';
import { CardAlunosComponent } from './components/card-alunos/card-alunos.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {AuthService} from 'src/app/services/auth.service';
import { EdicaoItensComponent } from './pages/edicao-itens/edicao-itens.component';
import { ExclusaoItensComponent } from './pages/exclusao-itens/exclusao-itens.component'

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LandingpageComponent,
    CardapioComponent,
    LoginComponent,
    ProfileComponent,
    AboutComponent,
    CategoryComponent,
    CardProdutosComponent,
    CardAlunosComponent,
    EdicaoItensComponent,
    ExclusaoItensComponent
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    BrowserAnimationsModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
