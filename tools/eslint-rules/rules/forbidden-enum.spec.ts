/**
 * @jest-environment node
 */

import { RuleTester } from '@typescript-eslint/rule-tester';
import { rule, RULE_NAME } from './forbidden-enum';

const ruleTester = new RuleTester();

ruleTester.run(RULE_NAME, rule, {
  valid: [`const example = true;`],
  invalid: [
    {
      code: `enum Direction {
  LEFT = 'left',
  RIGHT = 'right',
}`,
      errors: [
        {
          messageId: 'enumNotAllowed',
          suggestions: [
            {
              messageId: 'useStringUnions',
              output: '',
            },
          ],
        },
      ],
    },
  ],
});
