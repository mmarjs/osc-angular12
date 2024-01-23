// provider barrel
<% if (requests.length) { %>export * from './requests';<% } %>
<% if (responses.length) { %>export * from './responses';<% } %>

export * from './<%= camelize(name) %>.provider';
