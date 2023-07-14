import postcssImport from 'postcss-import'
import postcssPresetEnv from 'postcss-preset-env'
import autoprefixer from 'autoprefixer'

export default {
  plugins: [
    postcssImport(),
    postcssPresetEnv({
      stage: 2,
      features: {
        'nesting-rules': true,
      },
    }),
    autoprefixer({
      browser: ['last 10 versions', 'ie >= 11', 'not dead'],
    }),
  ],
}
