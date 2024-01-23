/**
 * <%= classify(name) %><%= classify(suffix) %>
 */

<% for (let origin in imports) {
  if (imports[origin].length) { %>import { <%= imports[origin].join(',\n') %> } from '<%= origin %>';<% } %>
<% } %>
export interface <%= classify(name) %><%= classify(suffix) %> {
  <% for (const field in fields) {
  %><%= field %><%= required.includes(field) ? '' : '?' %>: <%= genType(fields[field]) %>;
<% } %>}
