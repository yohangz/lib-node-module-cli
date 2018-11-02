import path from 'path';
import fs from 'fs';
import * as inspector from 'schema-inspector';

import { PackerConfig } from '../model/packer-config';
import { PackageConfig } from '../model/package-config';
import { BabelConfig } from '../model/babel-config';

const packerSchema = {
  type: 'object',
  properties: {
    entry: {
      type: 'string',
      optional: true,
      def: 'index.js'
    },
    source: {
      type: 'string',
      optional: true,
      def: 'src'
    },
    dist: {
      type: 'string',
      optional: true,
      def: 'dist'
    },
    output: {
      type: 'object',
      optional: true,
      properties: {
        amd: {
          type: 'object',
          properties: {
            entry: {
              type: 'define',
              optional: true,
              def: ''
            },
            source: {
              type: 'id',
              optional: true,
              def: ''
            },
          }
        },
        dependencyMapMode: {
          type: 'string',
          optional: true,
          def: 'cross-map-peer-dependency',
          pattern: /^(cross-map-peer-dependency|cross-map-dependency|map-dependency|map-peer-dependency|all)$/
        },
        esnext: {
          type: 'boolean',
          optional: true,
          def: true
        },
        es5: {
          type: 'boolean',
          optional: true,
          def: true
        },
        minBundle: {
          type: 'boolean',
          optional: true,
          def: true
        },
        format: {
          type: 'string',
          optional: true,
          def: 'umd',
          pattern: /^(umd|amd|iife|system|cjs|esm)$/
        },
        imageInlineLimit: {
          type: 'number',
          optional: true,
          gt: 0,
          def: 1000000,
        },
        inlineStyle: {
          type: 'boolean',
          optional: true,
          def: false,
        },
        stylesDir: {
          type: 'string',
          optional: true,
          def: 'styles'
        },
        namespace: {
          type: 'string',
          optional: true,
          def: ''
        },
        sourceMap: {
          type: [ 'string', 'boolean' ],
          optional: true,
          pattern: /^(inline)$/,
          def: true
        }
      }
    },
    compiler: {
      type: 'object',
      optional: true,
      properties: {
        buildMode: {
          type: 'string',
          optional: true,
          def: 'browser',
          pattern: /^(browser|node|node-cli)$/
        },
        scriptPreprocessor: {
          type: 'string',
          optional: true,
          def: 'none',
          pattern: /^(none|typescript)$/
        },
        stylePreprocessor: {
          type: 'string',
          optional: true,
          def: 'node',
          pattern: /^(scss|sass|less|stylus|none)$/
        },
        styleSupport: {
          type: 'boolean',
          optional: true,
          def: true
        }
      }
    },
    assetPaths: {
      type: 'array',
      optional: true,
      def: []
    },
    copy: {
      type: 'array',
      optional: true,
      def: [
        'README.md',
        'LICENSE'
      ]
    },
    bundle: {
      type: 'object',
      optional: true,
      properties: {
        externals: {
          type: 'array',
          optional: true,
          def: []
        },
        globals: {
          type: 'object',
          optional: true,
          def: {}
        },
        mapExternals: {
          type: 'boolean',
          optional: true,
          def: false
        }
      }
    },
    ignore: {
      type: 'array',
      optional: true,
      def: []
    },
    pathReplacePatterns: {
      type: 'array',
      optional: true,
      def: []
    },
    testFramework: {
      type: 'string',
      optional: true,
      def: 'jasmine',
      pattern: /^(jasmine|mocha)$/
    },
    watch: {
      type: 'object',
      optional: true,
      properties: {
        scriptDir: {
          type: 'string',
          optional: true,
          def: '.tmp'
        },
        demoDir: {
          type: 'string',
          optional: true,
          def: 'demo/watch'
        },
        helperDir: {
          type: 'string',
          optional: true,
          def: 'demo/helper'
        },
        open: {
          type: 'boolean',
          optional: true,
          def: true
        },
        port: {
          type: 'number',
          optional: true,
          gt: 0,
          lt: 65535,
          def: 4000
        },
        serve: {
          type: 'boolean',
          optional: true,
          def: true
        }
      }
    },
    license: {
      type: 'object',
      optional: true,
      properties: {
        banner: {
          type: 'boolean',
          optional: true,
          def: true
        },
        thirdParty: {
          type: 'object',
          optional: true,
          properties: {
            fileName: {
              type: 'string',
              optional: true,
              def: 'dependencies.txt'
            },
            includePrivate: {
              type: 'boolean',
              optional: true,
              def: false
            },
          }
        }
      }
    }
  }
};

export const readConfig = (): PackerConfig => {
  const packerConfig = require(path.join(process.cwd(), '.packerrc.json'));
  const validation = inspector.validate(packerSchema, packerConfig);
  if (!validation.valid) {
    throw new Error(validation.format());
  }

  const result = inspector.sanitize(validation, packerConfig);
  return result.data;
};

export const readPackageData = (): PackageConfig => {
  return require(path.join(process.cwd(), 'package.json'));
};

export const readCLIPackageData = (): PackageConfig => {
  return require(path.join(__dirname, '../package.json'));
};

export const readBabelConfig = (esVersion: string): BabelConfig => {
  return require(path.join(process.cwd(), `.babelrc.${esVersion}.js`));
};

export const readBannerTemplate = (): string => {
  return fs.readFileSync(path.join(process.cwd(), '.packer/banner.hbs'), 'utf8');
};

export const readSummary = (): string => {
  return fs.readFileSync(path.join(__dirname, '../resources/dynamic/packer-help.txt'), 'utf8');
};
