import manifestValidatorModule from '@microsoft/windows-admin-center-sdk/tools/gulp-manifest-validator';
import { parallel, src } from 'gulp';

export module ValidateModule {
    const manifestValidator = manifestValidatorModule as any;

    // special gulp task to test the manifest validation gulp tool.
    function testValidateManifests() {
        return src('src/manifest.json')
            .pipe(manifestValidator());
    }

    export const validate = parallel(testValidateManifests);
}
