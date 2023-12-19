import { merge } from 'webpack-merge'
import path from 'node:path'
import { BannerPlugin } from 'webpack'

import base from './base'

import generateHeader from '../header/header.plugin'
import matches from '../header/matches.plugin'
import version from '../src/version'

export default merge(base, {
    mode: 'production',
    cache: {
        type: 'filesystem',
        name: 'release',
    },
    output: {
        path: path.resolve('.', 'out'),
        filename: 'bundle.release.js',
    },
    plugins: [
        new BannerPlugin({
            banner: generateHeader({
                version: `${version}-${Date.now()}`,
                match: matches,
                isRelease: true,
            }),
            raw: true,
        })
    ]
})