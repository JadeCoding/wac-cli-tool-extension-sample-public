import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routing } from './manage-foo-works-portal.routing';
import { HttpService } from '@microsoft/windows-admin-center-sdk/angular';
import { Http } from '@microsoft/windows-admin-center-sdk/core';
import { PluginService } from './plugin.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    Routing
  ],
  providers: [
    HttpService,
    PluginService,
    Http
  ]
  
})
export class ManageFooWorksPortalModule { }
