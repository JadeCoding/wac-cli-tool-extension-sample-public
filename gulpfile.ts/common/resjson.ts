import manifestResourceModule from '@microsoft/windows-admin-center-sdk/tools/gulp-manifest-resource';
import gulpMergeJsonInFoldersModule from '@microsoft/windows-admin-center-sdk/tools/gulp-merge-json-in-folders';
import gulpResJsonModule from '@microsoft/windows-admin-center-sdk/tools/gulp-resjson';
import { dest, parallel, series, src } from 'gulp';
import { gulpConfig } from '../config-data';
import { Config } from './config';

export module ResjsonModule {
    const manifestResource = manifestResourceModule as any;
    const gulpResJson = gulpResJsonModule as any;
    const gulpMergeJsonInFolders = gulpMergeJsonInFoldersModule as any;

    const config: Config = gulpConfig();

    function resjsonJson(): any {
        return src('src/resources/strings/**/*.resjson')
            .pipe(gulpResJson({ json: true }))
            .pipe(dest('./src/assets/strings'));
    }

    function resjsonJsonLocalized(): any {
        return src(config.resjson.localePath + '/**/*.resjson')
            .pipe(gulpResJson({ json: true, localeOffset: config.resjson.localeOffset }))
            .pipe(dest('./src/assets/strings'));
    }

    function resjsonInterface(): any {
        return src('src/resources/**/*.resjson')
            .pipe(gulpResJson({ typescript: 'interface' }))
            .pipe(dest('src/generated'));
    }

    function mergeLocalizedJson(): any {
        return src(['./node_modules/@microsoft/windows-admin-center-sdk/**/assets/strings', '!./node_modules/@microsoft/windows-admin-center-sdk/e2e/assets/strings'])
            .pipe(gulpMergeJsonInFolders({ src: './src/assets/strings' }))
            .pipe(dest('src/assets/strings'));
    }

    function updateManifestResource(): any {
        return src(['src/resources/strings/strings.resjson', config.resjson.localePath + '/**/*.resjson'])
            .pipe(manifestResource({ localeOffset: config.resjson.localeOffset, resourceName: config.resjson.resourceName }))
            .pipe(dest('.'));
    }

    export const resjson = series(
        parallel(resjsonJson, resjsonJsonLocalized, resjsonInterface),
        parallel(mergeLocalizedJson, updateManifestResource)
    );
}
