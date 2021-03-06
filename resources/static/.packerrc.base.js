/**
 * Packer base configuration object.
 */
module.exports = {
  /**
   * Entry source file.
   * @type {string}
   * @default 'index.js'
   */
  entry: 'index.js',

  /**
   * Source directory
   * @type {string}
   * @default 'src'
   */
  source: 'src',

  /**
   * Build artifact output directory
   * @type {string}
   * @default 'dist'
   */
  dist: 'dist',

  /**
   * Watch and build temporary file directory
   * @type {string}
   * @default '.tmp'
   */
  tmp: '.tmp',

  /**
   * Packer compiler options
   */
  compiler: {
    /**
     * Dependency map mode option in target package.json file.
     * - 'cross-map-peer-dependency' : Map project dependencies to target peerDependencies
     * - 'cross-map-dependency' : Map project peerDependencies to target dependencies
     * - 'map-dependency' : Map project dependencies to target dependencies
     * - 'map-peer-dependency' : Map project peer dependencies to target peerDependencies
     * - 'all' - Map both peerDependencies and dependencies to target peerDependencies and dependencies
     * @type {string}
     * @default 'cross-map-peer-dependency'
     */
    dependencyMapMode: 'cross-map-peer-dependency',

    /**
     * Specified package fields will be copied to target package.json file.
     * @type {Array<string>}
     * @default [ 'name', 'version', 'description', 'keywords', 'author', 'repository', 'license', 'bugs', 'homepage' ]
     */
    packageFieldsToCopy: [
      'name',
      'version',
      'description',
      'keywords',
      'author',
      'repository',
      'license',
      'bugs',
      'homepage'
    ],

    /**
     * If true, a separate sourcemap file will be created. If inline, the sourcemap will be appended to
     * the resulting output file as a data URI.
     * @type {(boolean|string)}
     * @default true
     */
    sourceMap: true,

    /**
     * Custom rollup plugin extractor callback.
     * @callback customRollupPluginExtractorCallback
     * @param {string} buildType - 'bundle'|'es5'|'esnext'
     * @param {string} packerConfig - Packer configuration object.
     * @return {Array<{}>} Custom rollup plugin collection
     */

    /**
     * Extract custom rollup plugins to be executed while building the target artifacts.
     * @type {(null|customRollupPluginExtractorCallback)}
     */
    customRollupPluginExtractor: null,

    /**
     * Compile build target config.
     * @type {{}}
     * @default {}
     */
    build: {
      /**
       * Generate flat bundle minified build artifact.
       * @type {boolean}
       * @default true
       */
      bundleMin: true,

      /**
       * Generate flat es5 build artifact based on .babelrc es5 environment configuration.
       * @type {boolean}
       * @default false
       */
      es5: false,

      /**
       * Generate flat es5 minified build artifact.
       * @type {boolean}
       * @default false
       */
      es5Min: false,

      /**
       * Generate flat esnext build artifact based on .babelrc esnext environment configuration.
       * @type {boolean}
       * @default true
       */
      esnext: true,

      /**
       * Generate flat esnext minified build artifact.
       * @type {boolean}
       * @default true
       */
      esnextMin: true
    },

    /**
     * Library compile mode.
     * - 'browser' : Browser/NodeJS compliant module.
     * - 'node' : NodeJS only module.
     * - 'node-cli' : Node CLI module.
     * @type {string}
     * @default 'browser'
     */
    buildMode: 'browser',

    /**
     * Script compile configuration.
     * @type {{}}
     * @default {}
     */
    script: {
      /**
       * Script preprocessor.
       * - 'typescript' : use typescript preprocessor to transpile source.
       * - 'none': do not use any script preprocessor to transpile source.
       * @type {string}
       * @default 'none'
       */
      preprocessor: 'none',

      /**
       * Directory to copy typescript typescript definition files of target build if typescript preprocessor is used.
       * Path relative to dist directory. Empty string denote copy to distribution root.
       * @type {string}
       * @default 'typings'
       */
      tsd: 'typings',

      /**
       * Script required image compile configuration.
       * set false if not required to inline images
       * @type {({}|false)}
       * @default {}
       */
      image: {
        /**
         * Inline image if image size is less than or equal to specified limit.
         * @type {number}
         * @default 1000000
         */
        inlineLimit: 1000000,

        /**
         * Large image output directory within distribution directory.
         * @type {string}
         * @default 'images'
         */
        outDir: 'images'
      }
    },

    /**
     * Style compile configuration.
     * Set false if styles are not supported.
     * @type {({}|false)}
     * @default {}
     */
    style: {
      /**
       * Bundle styles inline within target build and inject to head at runtime.
       * @type {boolean}
       * @default false
       */
      inline: false,

      /**
       * Bundled style output directory path within distribution directory.
       * @type {string}
       * @default 'styles'
       */
      outDir: 'styles',

      /**
       * Style preprocessor
       * - 'scss' : SCSS style preprocessor.
       * - 'sass' : SASS style preprocessor.
       * - 'stylus' : Stylus style preprocessor.
       * - 'less' : LESS style preprocessor.
       * - 'none' : Do not use any style preprocessor.
       * @type {string}
       * @default 'none'
       */
      preprocessor: 'none',

      /**
       * Stylesheet required image compile configuration.
       * set false if not required to inline images
       * @type {({}|false)}
       * @default {}
       */
      image: {
        /**
         * Inline image if image size is less than or equal to specified limit.
         * @type {number}
         * @default 1000000
         */
        inlineLimit: 1000000,

        /**
         * Large image output directory within distribution directory.
         * @type {string}
         * @default 'images'
         */
        outDir: 'images'
      }
    },

    /**
     * Run bundle build tasks concurrently to improve performance if true
     * @type {boolean}
     * @default true
     */
    concurrentBuild: true,

    /**
     * Advance compiler options to override plugin configuration.
     * Caution! change only if you know what you are doing.
     * @type {{}}
     */
    advanced: {
      /**
       * Rollup plugins.
       * refer: https://rollupjs.org
       * @type {{}}
       */
      rollup: {
        /**
         * Override rollup build task input options.
         * refer: https://rollupjs.org inputOptions section.
         * @type {{}}
         */
        inputOptions: {},

        /**
         * Override rollup build task output options.
         * refer: https://rollupjs.org outputOptions section.
         * @type {{}}
         */
        outputOptions: {},

        /**
         * Override rollup watch task options.
         * refer: https://rollupjs.org watchOptions section.
         * @type {{}}
         */
        watchOptions: {},

        /**
         * Override rollup plugin options.
         * refer: https://rollupjs.org plugins section.
         * @type {{}}
         */
        pluginOptions: {
          /**
           * Override ignore import plugin options
           * refer: https://github.com/yohangz/rollup-plugin-ignore-import
           * @type {{}}
           */
          ignoreImport: {},

          /**
           * Override post css plugin options.
           * refer: https://github.com/egoist/rollup-plugin-postcss
           */
          postCss: {},

          /**
           * Override node resolve plugin options.
           * refer: https://github.com/rollup/rollup-plugin-node-resolve
           * @type {{}}
           */
          nodeResolve: {},

          /**
           * Override commonjs plugin options.
           * refer: https://github.com/rollup/rollup-plugin-commonjs
           * @type {{}}
           */
          commonjs: {},

          /**
           * Override json plugin options.
           * refer: https://github.com/rollup/rollup-plugin-json
           * @type {{}}
           */
          json: {},

          /**
           * Override globals plugin options.
           * refer: https://github.com/calvinmetcalf/rollup-plugin-node-globals
           * @type {{}}
           */
          globals: {},

          /**
           * Override babel plugin options.
           * refer: https://github.com/rollup/rollup-plugin-babel
           * @type {{}}
           */
          babel: {},

          /**
           * Override typescript plugin options.
           * refer: https://github.com/ezolenko/rollup-plugin-typescript2
           * @type {{}}
           */
          typescript: {},

          /**
           * Override replace plugin options.
           * refer: https://github.com/jetiny/rollup-plugin-re
           */
          replace: {},

          /**
           * Override image plugin options.
           * refer: https://github.com/alwaysonlinetxm/rollup-plugin-img
           * @type {{}}
           */
          image: {},

          /**
           * Override handlebars plugin options.
           * refer: https://github.com/yohangz/rollup-plugin-hbs
           * @type {{}}
           */
          handlebars: {},

          /**
           * Override filesize plugin options.
           * refer: https://github.com/ritz078/rollup-plugin-filesize
           * @type {{}}
           */
          filesize: {},

          /**
           * Override browserSync plugin options.
           * refer: https://github.com/4lejandrito/rollup-plugin-browsersync
           * All browser sync options are applicable: https://browsersync.io/docs/options
           * @type {{}}
           */
          browserSync: {}
        }
      },

      /**
       * Other plugins.
       */
      other: {
        /**
         * Override terser plugin options.
         * refer: https://github.com/terser-js/terser
         * @type {{}}
         */
        terser: {},

        /**
         * Override cssnano options.
         * refer: https://github.com/cssnano/cssnano
         * @type {{}}
         */
        cssnano: {}
      }
    }
  },

  /**
   * List of paths which contains static assets referenced in style sheets.
   * Paths should be relative to project root.
   * @type {Array<string>}
   * @default []
   */
  assetPaths: ['src/assets'],

  /**
   * List of files paths to copy on build.
   * Paths should be relative to project root.
   * @type {Array<string>}
   * @default [ 'README.md', 'LICENSE' ]
   */
  copy: ['README.md', 'LICENSE'],

  /**
   * Prevent a module from showing up in the output bundle. You will get export default {} instead.
   * @type {Array<string>}
   * @default []
   */
  ignore: [],

  /**
   * Custom rollup plugin extractor callback.
   * @callback pathReplaceCallback
   * @param {string} code - code segment
   * @param {string} id - file path/identifier.
   * @return {string} transformed code.
   */

  /**
   * Path Replace pattern object type.
   * @typedef {Object} PathReplacePattern
   * @property {(string|RegExp)} test - test expression or string.
   * @property {string} replace - string to replace the match.
   * @property {RegExp} match - regexp match with resolved path.
   * @property {(string|string[])} include - whitelist patterns to match.
   * @property {(string|string[])} exclude - blacklist patterns avoid matching.
   * @property {string} text - replace content with given text.
   * @property {string} file - replace with given file relative to project root.
   * @property {pathReplaceCallback} transform - path replace function.
   */

  /**
   * Import path replace pattern collection.
   * @type {Array<PathReplacePattern>}
   * @default []
   */
  replacePatterns: [
    {
      /**
       * Test path identifier string or regular expression.
       * @type {(string|RegExp)}
       * @default ''
       */
      test: './config/base-config',

      /**
       * Replace path string.
       * @type {string}
       * @default ''
       */
      replace: './config/replace-config'
    }
  ],

  /**
   * Bundle artifact build configuration.
   * @type {{}}
   */
  bundle: {
    /**
     * Bundle output external dependencies (dependency modules to treat as externals).
     * Refer rollup options for more info.
     * @type {Array<string>}
     * @default []
     */
    externals: ['regenerator-runtime/**', '@babel/runtime/**', '@babel/runtime-corejs2/**'],

    /**
     * Bundle output global dependencies (dependency modules to tread as globals).
     * Refer rollup options for more info.
     * @type {{}}
     * @default {}
     */
    globals: {
      react: 'React',
      'react-dom': 'ReactDOM'
    },

    /**
     * Treat globals as externals if true
     * @type {boolean}
     * @default true
     */
    mapExternals: true,

    /**
     * Browser compliant bundle modules formats (based on .babelrc bundle environment configuration)
     * - 'umd' – Universal Module Definition, works as amd, cjs and iife all in one
     * - 'amd' – Asynchronous Module Definition, used with module loaders like RequireJS
     * - 'iife' – A self-executing function, suitable for inclusion as a DOM script tag. (If you want to create a bundle
     * for your application, you probably want to use this, because it leads to smaller file sizes.)
     * - 'system' - Native format of SystemJS loader
     *
     * NodeJS only bundle module formats
     * 'cjs' – CommonJS, suitable for Node and Browserify/Webpack
     * 'esm' – Keep the bundle as an ES module file
     * @type {string}
     * @default 'umd'
     */
    format: 'umd',

    /**
     * Library global scope namespace (only applicable for browser compliant).
     * @type {string}
     * @default 'com.lib'
     */
    namespace: 'com.lib',

    /**
     * AMD flat bundle configuration
     * @type {{}}
     * @default {}
     */
    amd: {
      /**
       * AMD flat bundle define function name
       * @type {string}
       * @default ''
       */
      define: '',

      /**
       * AMD flat bundle module identifier name
       * @type {string}
       * @default 'my-lib'
       */
      id: 'my-lib'
    }
  },

  /**
   * Unit test configuration.
   * @type {{}}
   */
  test: {
    /**
     * Unit test framework
     *  - 'jasmine' - https://jasmine.github.io/
     *  - 'mocha' - https://mochajs.org/
     *  - 'jest' - https://jestjs.io/
     * @type {string}
     * @default 'jasmine'
     */
    framework: 'jasmine',

    /**
     * Unit test environment.
     * - 'node' - nodejs only unit test environment to test none browser compliant libraries.
     * - 'browser' - browser based unit test environment with karma.
     * - 'jsdom' - browser like unit test environment in nodejs with jsdom.
     * - 'enzyme' - Only supported when building react library with jest test framework.
     * @type {string}
     * @default 'node'
     */
    environment: 'node',

    /**
     * Unit test framework advanced options.
     * Caution! change only if you know what you are doing.
     * @type {{}}
     * @default {}
     */
    advanced: {
      /**
       * Jasmine CLI commands used with none browser test environments.
       * @type {{}}
       * @default {}
       */
      jasmine: {
        /**
         * Execute test spec on single run mode command.
         * @type {string}
         * @default 'jasmine --config=jasmine.json'
         */
        default: 'jasmine --config=jasmine.json',

        /**
         * Execute test spec on watch mode command.
         * Note: Jasmine does not support watch mode out of the box, hence chokidar is used to watch source changes.
         * @type {string}
         * @default 'jasmine --config=jasmine.json'
         */
        watch: 'jasmine --config=jasmine.json',

        /**
         * Execute test spec on single run mode with coverage support command.
         * @type {string}
         * @default 'nyc jasmine --config=jasmine.json'
         */
        coverageDefault: 'nyc jasmine --config=jasmine.json',

        /**
         * Execute test spec on watch mode with coverage support command.
         * Note: Jasmine does not support watch mode out of the box, hence chokidar is used to watch source changes.
         * @type {string}
         * @default 'nyc jasmine --config=jasmine.json'
         */
        coverageWatch: 'nyc jasmine --config=jasmine.json'
      },

      /**
       * Mocha CLI commands used with none browser test environments.
       * @type {{}}
       * @default {}
       */
      mocha: {
        /**
         * Execute test spec on single run mode command.
         * <ext-glob> is replaced with script extensions glob depending on script preprocessor at runtime.
         * @type {string}
         */
        default: 'mocha --opts mocha.opts ./{,!(node_modules)/**/}*.[sS]pec.<ext-glob>',

        /**
         * Execute test spec on watch mode command.
         * <ext-glob> is replaced with script extensions glob depending on script preprocessor at runtime.
         * @type {string}
         */
        watch: 'mocha --opts mocha.opts --watch ./{,!(node_modules)/**/}*.[sS]pec.<ext-glob>',

        /**
         * Execute test spec on single run mode with coverage support command.
         * <ext-glob> is replaced with script extensions glob depending on script preprocessor at runtime.
         * @type {string}
         */
        coverageDefault: 'nyc mocha --opts mocha.opts --watch ./{,!(node_modules)/**/}*.[sS]pec.<ext-glob>',

        /**
         * Execute test spec on watch mode with coverage support command.
         * <ext-glob> is replaced with script extensions glob depending on script preprocessor at runtime.
         * @type {string}
         */
        coverageWatch: 'nyc mocha --opts mocha.opts --watch ./{,!(node_modules)/**/}*.[sS]pec.<ext-glob>'
      },

      /**
       * Jest CLI commands used with all test environments.
       * @type {{}}
       * @default {}
       */
      jest: {
        /**
         * Execute test spec on single run mode command.
         * @type {string}
         * @default 'jest --config=jest.config.js'
         */
        default: 'jest --config=jest.config.js',

        /**
         * Execute test spec on watch mode command.
         * @type {string}
         * @default 'jest --config=jest.config.js --watchAll'
         */
        watch: 'jest --config=jest.config.js --watchAll',

        /**
         * Execute test spec on single run mode with coverage support command.
         * @type {string}
         * @default 'jest --config=jest.config.js --coverage'
         */
        coverageDefault: 'jest --config=jest.config.js --coverage',

        /**
         * Execute test spec on watch mode with coverage support command.
         * @type {string}
         * @default 'jest --config=jest.config.js --coverage --watchAll'
         */
        coverageWatch: 'jest --config=jest.config.js --coverage --watchAll'
      }
    }
  },

  /**
   * Watch mode serve configuration.
   * Set false if not required to serve on watch build.
   * @type {({}|false)}
   * @default {}
   */
  serve: {
    /**
     * Demo watch source directory which contains index.html to serve.
     * This path should be relative to root.
     * @type {string}
     * @default 'demo/watch'
     */
    demoDir: 'demo/watch',

    /**
     * Demo watch helper directory which contains helper scripts to serve.
     * This path should be relative to root.
     * @type {string}
     * @default 'demo/watch'
     */
    helperDir: 'demo/helper',

    /**
     * Additional serve directories.
     * These paths should be relative to root.
     * @type {Array<string>}
     * @default []
     */
    serveDir: ['node_modules/react/umd', 'node_modules/react-dom/umd'],

    /**
     * Open browser tab on watch mode build if true
     * @type {boolean}
     * @default true
     */
    open: true,

    /**
     * Watch source serve port.
     * @type {number}
     * @default 4000
     */
    port: 4000
  },

  /**
   * Bundle license configuration
   * @type {{}}
   * @default {}
   */
  license: {
    /**
     * Include inline header banner parsed via .packer/.banner.hbs template to build artifacts.
     * @type {boolean}
     * @default true
     */
    banner: true
  },

  /**
   * Code auto format configuration.
   * Auto format with https://prettier.io
   * @type {{}}
   * @default {}
   */
  format: {
    /**
     * File extensions to auto format.
     * @type {string[]}
     * @default [ 'js', 'jsx', 'ts', 'tsx', 'html', 'scss', 'css', 'less', 'json' ]
     */
    extensions: ['js', 'jsx', 'ts', 'tsx', 'html', 'scss', 'css', 'less', 'json'],

    /**
     * Advance options to override formatter configuration.
     * Caution! change only if you know what you are doing.
     * @type {{}}
     */
    advanced: {
      /**
       * Prettier format command.
       * @type {string}
       */
      command: 'prettier --write **/*.{<ext-glob>}'
    }
  },

  /**
   * Linter configuration.
   * @type {{}}
   * @default {}
   */
  lint: {
    /**
     * Advance options to override linter configuration.
     * Caution! change only if you know what you are doing.
     * @type {{}}
     */
    advanced: {
      /**
       * Execute style lint command.
       * @type {string}
       */
      style: 'stylelint **/*.{styl,scss,sass,less,css}',

      /**
       * Execute tslint command.
       * @type {string}
       */
      typescript: 'tslint **/*.{ts,tsx}',

      /**
       * Execute eslint command.
       * @type {string}
       */
      javascript: 'eslint **/*.{js,mjs}'
    }
  }
};
