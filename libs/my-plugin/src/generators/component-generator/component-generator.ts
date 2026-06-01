import {
  addProjectConfiguration,
  formatFiles,
  generateFiles,
  Tree,
} from '@nx/devkit';
import * as path from 'path';
import { ComponentGeneratorGeneratorSchema } from './schema';

const capitalize = (word: string) => {
  return word.charAt(0).toUpperCase() + word.slice(1).toLocaleLowerCase();
};

export async function componentGeneratorGenerator(
  tree: Tree,
  options: ComponentGeneratorGeneratorSchema,
) {
  const hasInlineTemplate = options.inlineTemplate === 'yes';
  const willCreateService = options.createService === 'yes';
  const capitalName = capitalize(options.name);
  const lowerName = options.name.toLowerCase();

  const projectRoot = `libs/${options.name.toLowerCase()}`;
  addProjectConfiguration(tree, options.name.toLowerCase(), {
    root: projectRoot,
    projectType: 'library',
    sourceRoot: `${projectRoot}/src`,
    targets: {},
  });

  generateFiles(tree, path.join(__dirname, 'files'), projectRoot, {
    ...options,
    name: lowerName,
    capitalName,
    lowerName,
    hasInlineTemplate,
    willCreateService,
  });

  if (hasInlineTemplate) {
    tree.delete(`${projectRoot}/src/${lowerName}.component.html`);
  }

  if (!willCreateService) {
    tree.delete(`${projectRoot}/src/${lowerName}.service.ts`);
    tree.delete(`${projectRoot}/src/${lowerName}.store.ts.no-service`);
  }

  await formatFiles(tree);
}

export default componentGeneratorGenerator;
