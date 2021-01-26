import { Config } from '@stencil/core';

export const config: Config = {
    namespace: 'webcardinal',
    globalScript: './src/globals/index.ts',
    outputTargets: [
        {
            type: 'dist',
            dir: 'build/dist',
        }
    ]
}
