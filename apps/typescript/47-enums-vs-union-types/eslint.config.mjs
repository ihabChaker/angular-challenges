import nx from '@nx/eslint-plugin';
import baseConfig from '../../../eslint.config.mjs';
import {
  RULE_NAME,
  rule,
} from '../../../tools/eslint-rules/rules/forbidden-enum';

export default [
  ...baseConfig,
  ...nx.configs['flat/angular'],
  ...nx.configs['flat/angular-template'],

  {
    files: ['**/*.ts'],
    plugins: {
      local: { rules: { [RULE_NAME]: rule } }, // register your rule
    },
    rules: {
      [`local/${RULE_NAME}`]: 'error',
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'app',
          style: 'camelCase',
        },
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'app',
          style: 'kebab-case',
        },
      ],
    },
  },
  {
    files: ['**/*.html'],
    // Override or add rules here
    rules: {},
  },
];
