import { Utilities } from './utilities';

export module CompileModule {
    const argv = Utilities.gulpArgv();

    function getBundleArguments(appName: string): string[] {
        const args = ['build', appName, '--aot', '--progress=false', '--extract-licenses=false'];
        if (argv['verbose']) { args.push('--verbose'); }
        if (argv['prod']) { args.push('--prod'); }
        if (argv['watch']) { args.push('--watch'); }
        return args;
    }

    function getServeArguments(): string[] {
        const args = ['serve'].concat(process.argv.slice(3));
        return args;
    }

    export function compileLib(cb): any {
        const argArray = ['build', 'module-lib'];

        if (argv['prod']) {
            argArray.push('--prod');
        }

        Utilities.ng(cb, argArray);
    }

    export function bundleApp(cb): void {
        const args = getBundleArguments('module-app');
        Utilities.ng(cb, args);
    }

    export function serveApp(cb): void {
        const args = getServeArguments();
        Utilities.ng(cb, args);
    }
}
