import { DropdownDirective } from './shared/dropdown.directive';
import { CpfPipe } from './shared/cpf.pipe';
import { FiltroPipe } from './shared/filtro.pipe';
import { CadastroComponent } from './cadastro/cadastro.component';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ClienteListComponent } from './cliente-list/cliente-list.component';
import { HeaderComponent } from './header/header.component';
import { ClienteItemComponent } from './cliente-list/cliente-item/cliente-item.component';
import { allIcons, NgxBootstrapIconsModule } from 'ngx-bootstrap-icons';
import { ClienteDetalhesComponent } from './cliente-list/cliente-detalhes/cliente-detalhes.component';
import { AppRoutingModule } from './app-routing.module';
import { IMaskModule } from 'angular-imask';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { HttpClientModule } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import ptBr from '@angular/common/locales/pt';
import { ModalModule, BsModalService } from 'ngx-bootstrap/modal';

registerLocaleData(ptBr);

@NgModule({
  declarations: [
    AppComponent,
    CadastroComponent,
    ClienteListComponent,
    HeaderComponent,
    ClienteItemComponent,
    FiltroPipe,
    CpfPipe,
    DropdownDirective,
    ClienteDetalhesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgxBootstrapIconsModule.pick(allIcons),
    ReactiveFormsModule,
    IMaskModule,
    CurrencyMaskModule,
    HttpClientModule,
    ModalModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt' },
    BsModalService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
