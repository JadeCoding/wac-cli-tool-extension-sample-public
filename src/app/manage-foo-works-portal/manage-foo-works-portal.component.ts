import { Component, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { AppContextService } from '@microsoft/windows-admin-center-sdk/angular';
import { Subscription } from 'rxjs';
import { Strings } from '../../generated/strings';
import { PluginService } from './plugin.service';

@Component({
  selector: 'app-manage-foo-works-portal',
  templateUrl: './manage-foo-works-portal.component.html',
  styleUrls: ['./manage-foo-works-portal.component.css']
})
export class ManageFooWorksPortalComponent implements OnInit {
  private serviceSubscription: Subscription;
  //private responseResult: string;
  responseResult: string;

  constructor(private appContextService: AppContextService, private plugin: PluginService) {
    //
  }

  public ngOnInit() {
    this.responseResult = 'click go to do something';
  }

  public onClick() {
    this.serviceSubscription = this.plugin.getGatewayRestResponse().subscribe(
      (response: any) => {
        this.responseResult = 'response: ' + response.message;
      },
      (error) => {
        console.log(error);
      }
    );
  }

}
