import { strings } from '@angular-devkit/core';
import { Tree } from '@angular-devkit/schematics';
import { coreTypes, entList, entUsed, sharedTypes, typesMap } from './cache';
import { Dictionary, ImportsDef, SwaggerEntity } from './interfaces';

export function sortObject(data: any) {
  const res = {};
  Object.keys(data)
    .sort()
    .forEach(key => (res[key] = data[key]));
  return res;
}

export function readFile(tree: Tree, path: string) {
  return JSON.parse(tree.read(path).toString('utf-8'));
}

/**
 * Swagger
 */

export function cleanSwaggerDef(type: string) {
  type = type.replace('#/definitions/', '');
  return type.replace(/(.*)?«(.*)?»/, (...matches) => {
    switch (matches[1]) {
      case 'Response':
        return `PagedResponse<${matches[2]}>`;
      case 'Map':
        // FIXME verify the form with the backend response
        return `MappedResponse<${matches[2].split(',')[1]}>`;
      default:
        console.error(`Type '${matches[0]}' not processed`);
        return `${matches[1]}<${matches[2]}>`;
    }
  });
}

export function typeFromSwagger(entity: SwaggerEntity) {
  const type =
    entity.type ||
    entity.$ref ||
    (entity.schema ? entity.schema.$ref || entity.schema.type : '');

  const items = entity.items || entity.additionalProperties;

  if (!type) {
    console.error('✘ Cannot figure the type of: ', entity);
    throw new Error('utils.typeFromSwagger');
  }

  if (typesMap[type]) {
    return typesMap[type];
  } else if (type.startsWith('#/definitions/')) {
    return cleanSwaggerDef(type);
  } else {
    switch (type) {
      case 'integer':
      case 'long':
      case 'number':
      case 'float':
      case 'double':
        return 'number';
      case 'string':
      case 'byte':
      case 'binary':
      case 'date':
      case 'dateTime':
      case 'password':
        return 'string';
      case 'boolean':
        return 'boolean';
      case 'file':
        // TODO build a file interface
        return 'any';
      case 'array':
        return items ? `Array<${typeFromSwagger(items)}>` : 'Array<any>';
      case 'object':
        // TODO what is type=object and items.type=boolean
        return items && items.$ref ? typeFromSwagger(items) : 'any';
      default:
        console.log(`- Type '${type}' untouched`);
        return type;
    }
  }
}

/**
 * Templating
 */

export function isRequired(definition: Dictionary<any>) {
  if (!definition) {
    return false;
  }
  // all fields must be optional
  for (const [, field] of Object.entries(definition)) {
    if (!field.required) {
      return false;
    }
  }
  return true;
}

/**
 * Type analysis
 */
export function addImports(
  type: string,
  imports: ImportsDef,
  isEntity = false
) {
  function addToImports(lib: string, item: string) {
    if (!imports[lib]) {
      imports[lib] = [];
    }
    if (!imports[lib].includes(item)) {
      imports[lib].push(item);
    }
  }

  if (type.includes('<')) {
    const matches = type.match(/(.*)?<(.*)>/);
    addImports(matches[1], imports, isEntity);
    addImports(matches[2], imports, isEntity);
  } else {
    if (entList.includes(type)) {
      // update the entUsed array to generate only those
      if (!entUsed.includes(type)) {
        entUsed.push(type);
      }
      // TODO generate the library path with the options
      addToImports(
        !isEntity ? '@ocean/api/shared' : `./${strings.camelize(type)}`,
        type
      );
    } else if (sharedTypes.includes(type)) {
      addToImports(!isEntity ? '@ocean/api/shared' : `../generic`, type);
    } else if (!coreTypes.includes(type)) {
      console.error(`✘ Import of '${type}' not resolved!`);
    }
  }
}

// utility to extract the entity name from a type (Array<>)
export function getEntityClass(type: string) {
  let check = type;
  if (check.includes('<') && check.match(/.*?<(.*)>/)) {
    check = check.match(/.*?<(.*)>/)[1];
  }
  if (
    !entList.includes(check) &&
    !sharedTypes.includes(check) &&
    !coreTypes.includes(check)
  ) {
    console.error(`✘ Entity class not resolved for ${type}`);
    return '';
  }
  return entList.includes(type) ? type : '';
}
