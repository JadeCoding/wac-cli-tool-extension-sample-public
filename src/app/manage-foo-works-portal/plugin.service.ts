import { Injectable } from '@angular/core';
import { AppContextService, HttpService } from '@microsoft/windows-admin-center-sdk/angular';
import { Cim, Http, PowerShell, PowerShellSession } from '@microsoft/windows-admin-center-sdk/core';
//import { AjaxResponse, Observable } from 'rxjs';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

@Injectable()
export class PluginService {
    constructor(private appContextService: AppContextService, private http: Http) {
    }

    public getGatewayRestResponse(): Observable<any> {
        let callUrl = this.appContextService.activeConnection.nodeName;

        // return this.appContextService.node.get(callUrl, 'features/Sample%20Uno').map(
        //     (response: any) => {
        //         return response;
        //     }
        // )
        return this.appContextService.node.get(callUrl, 'features/Sample%20Uno')
        .pipe(map((response: any) => {
            console.log('Gateway plugin returns.');
            console.log(response);
            if (response) {
                return response;
            }
        }));
       

    }
}
