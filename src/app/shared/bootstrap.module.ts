import { NgModule } from '@angular/core';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { AlertModule } from 'ngx-bootstrap/alert';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { AccordionModule } from 'ngx-bootstrap/accordion';

@NgModule({
    imports: [AlertModule.forRoot(), CollapseModule.forRoot(), TooltipModule.forRoot(), AccordionModule.forRoot(), BsDropdownModule.forRoot(), ModalModule.forRoot(), TabsModule.forRoot()],
    exports: [AlertModule, CollapseModule, TooltipModule, AccordionModule, BsDropdownModule, ModalModule, TabsModule],
    declarations: [],
    providers: []
})

export class SharedBootstrapModule {

}