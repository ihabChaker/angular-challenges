import { Tree, readProjectConfiguration } from '@nx/devkit';
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';

import { componentGeneratorGenerator } from './component-generator';
import { ComponentGeneratorGeneratorSchema } from './schema';

describe('component-generator generator', () => {
  let tree: Tree;
  const options: ComponentGeneratorGeneratorSchema = { name: 'test' };

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace();
  });

  it('should run successfully', async () => {
    await componentGeneratorGenerator(tree, options);
    const config = readProjectConfiguration(tree, 'test');
    expect(config).toBeDefined();
  });
});
