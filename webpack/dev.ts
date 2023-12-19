import { merge } from 'webpack-merge'
import path from 'node:path'
import { BannerPlugin } from 'webpack'

import base from './base'

import generateHeader from '../header/header.plugin'
import matches from '../header/matches.plugin'
import version from '../src/version'

export default merge(base, {
    mode: 'development',
    cache: {
        type: 'filesystem',
        name: 'dev',
    },
    output: {
        path: path.resolve('.', 'out'),
        filename: 'bundle.dev.js',
    },
    devtool: 'eval-source-map',
    plugins: [
        new BannerPlugin({
            banner: generateHeader({
                version: `${version}-${Date.now()}`,
                match: matches,
                isRelease: false,
                updateURL: 'http://172.24.112.1:8080/bundle.dev.user.js'
            }),
            raw: true,
        })
    ]
})