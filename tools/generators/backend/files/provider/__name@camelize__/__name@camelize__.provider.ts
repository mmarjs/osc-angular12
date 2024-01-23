import { Injectable } from '@angular/core';
import { ClientService, Params } from '@ocean/api/client';
<% for (let origin in imports) {
  if (imports[origin].length) { %>import { <%= imports[origin].join(',\n') %> } from '<%= origin %>';<% }} %>

<% if (requests.length) { %>import {
<%= requests.map(i => `${i.prefix}Request`).join(',\n') %>
} from './requests';<% } %>
<% if (responses.length) { %>import {
<%= responses.map(i => `${i.prefix}Response`).join(',\n') %>
} from './responses';<% } %>

@Injectable({
  providedIn: 'root'
})
export class <%= classify(name) %>Provider {
  public constructor(private readonly api: ClientService) { }

  <% for (let method in methods) {
    const def = methods[method];
    const request = requests.find(r => r.prefix === def.prefix);
    // TODO setup the different parameters here
  %>
  /**
   * <%= classify(method) %>
   * <%= def.docs %>
   */
  public <%= method %>(
    <%= def.request.exists ? `request${def.request.required ? '' : '?'}: ${def.prefix}Request` : '' %>
  ) {<% if (request && request.parameters.some(p => p.in !== 'path')) { %>
    const params = new Params(request<%= genParams(request) %>);<% } %>

    return this.api.request<%= `<${def.response || 'void'}>` %>({
      url: `<%= genUrl(def.api.url, request) %>`,
      method: '<%= def.api.method %>' <% if(request && request.parameters.some(p => p.in === 'query')) { %>,
      params: params.forQuery <% } %><% if(request && request.parameters.some(p => p.in === 'body' || p.in === 'formData')) { %>,
      data: params.forBody<% } %>
    });
  }
  <% } %>
}
