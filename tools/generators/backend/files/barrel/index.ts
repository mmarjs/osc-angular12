<% for (const mod of exports) { %>
export * from './<%= camelize(mod) %>';<% } %>
