import { Config } from './common/config';

export function gulpConfig(): Config {
    return {
        resjson: {
            resourceName: 'ContosoIncManageFooWorks',
            localeOffset: 1,
            localePath: 'loc/output'
        },
        powershell: {
            name: 'contoso-inc.manage-foo-works',
            guid: 'a2d71435-4557-ec80-038f-995c3341ed38',
            list: [
                'src',
                'node_modules/@microsoft/windows-admin-center-sdk/core'
            ],
            enablePester: true,
            skipCim: true,
            skipManifest: false,
            skipModule: false,
            skipResjson: false
        },
        build: {
            library: false
        }
    };
}
