import { coreTypes, entList, sharedTypes } from './cache';
import { RequestDef } from './interfaces';

export function genParams(request: RequestDef) {
  if (!request) {
    return ``;
  }

  function reduce(list: Array<string>) {
    return list.map(v => `'${v}'`).join(', ');
  }

  const params = {
    path: [],
    query: [],
    body: [],
    formData: []
  };

  for (const param of request.parameters) {
    if (params[param.in]) {
      params[param.in].push(param.name);
    } else {
      console.error(`✘ Unhandled parameter type ${param.in}`);
    }
  }

  return (
    `, [${reduce(params.path)}]` +
    `, [${reduce(params.query)}]` +
    `, [${reduce(params.body.concat(params.formData))}]`
  );
}

export function genUrl(url: string, request?: RequestDef) {
  if (!request) {
    return url;
  }

  const params = request.parameters.filter(p => p.in === 'path');

  // find path parameters and insert them into the url
  return url.replace(/\{([^\}]+)?\}/g, (...matches) => {
    const key = matches[1];
    if (!params.some(p => p.name === key)) {
      console.error(`✘ ${key} not found in '${url}'`);
    }
    return `\${request.${key}}`;
  });
}

export function genType(type: string): string {
  let check = type;
  if (check.includes('<') && check.match(/.*?<(.*)>/)) {
    check = check.match(/.*?<(.*)>/)[1];
  }
  if (
    coreTypes.includes(check) ||
    entList.includes(check) ||
    sharedTypes.includes(check)
  ) {
    return type;
  }
  // fallbacks undefined types to any
  return 'any';
}
