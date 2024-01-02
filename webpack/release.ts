import { merge } from 'webpack-merge'
import path from 'node:path'
import { BannerPlugin } from 'webpack'

import base from './base'

import generateHeader from '../header/header.plugin'
import matches from '../header/matches.plugin'
import version from '../src/version'
import TerserPlugin from 'terser-webpack-plugin'

// We want to keep the comments we need for the userscript, but strip all others.
const USERSCRIPT_HEADER_PREFIXES = [
    '==UserScript==',
    ' @',
    '==/UserScript==',
]

const USERSCRIPT_HEADER_COMMENT_REGEX = new RegExp(
    `(${USERSCRIPT_HEADER_PREFIXES.join('|')})`,
    'i'
)

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
    optimization: {
        minimize: true,
        minimizer: [
          new TerserPlugin({
            terserOptions: {
              format: {
                comments: USERSCRIPT_HEADER_COMMENT_REGEX,
              },
            },
          }),
        ],
      },
    plugins: [
        new BannerPlugin({
            banner: generateHeader({
                version: `${version}`,
                match: matches,
                isRelease: true,
            }),
            raw: true,
        }),
    ],
})