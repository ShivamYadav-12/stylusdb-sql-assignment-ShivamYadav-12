function parseQuery(query) {
  const selectRegex = /SELECT (.+?) FROM (.+?)(?: WHERE (.*))?$/i;
  const match = query.match(selectRegex);

  if (match) {
    const [, fields, table, whereString] = match;
    const whereClauses = whereString ? parseWhereClause(whereString) : [];
    return {
      fields: fields.split(",").map((field) => field.trim()),
      table: table.trim(),
      whereClauses,
    };
  } else {
    throw new Error("Invalid query format");
  }
}
function parseWhereClause(whereString) {
  try {
    const conditions = whereString.split(/ AND | OR /i);
    return conditions.map((condition) => {
      const [field, operator, value] = condition.split(/\s+/);
      if (field && operator && value) {
        return { field, operator, value };
      } else {
        throw new Error("Invalid condition format");
      }
    });
  } catch (error) {
    console.error("Error parsing where clause:", error.message);
    //return [];// or handle the error in another appropriate way
  }
}

module.exports = parseQuery;
