import { Config } from '@stencil/core';

export const config: Config = {
    globalScript: './src/globals/index.ts',
    outputTargets: [
        {
            type: 'dist-custom-elements-bundle',
            dir: 'build',
        }
    ]
}
