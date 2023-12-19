import { Configuration } from 'webpack'

const config: Configuration = {
    entry: './src/index.ts',
    target: 'web',
    resolve: {
        extensions: ['.ts', '.js'],
    },
    optimization: {
        minimize: false,
    },
    module: {
        rules: [
          {
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/,
          },
        ],
      },
}

export default config