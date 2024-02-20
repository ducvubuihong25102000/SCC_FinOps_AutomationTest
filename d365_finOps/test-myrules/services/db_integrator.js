const { getConnectionString } = require('../config/db-conf');
const ODBC = require('odbc');

module.exports = {
  executeQuery: async function executeQuery(queryStament) {
    let combined_query =
      queryStament.Query + "'" + queryStament.EmploymentNumber + "'";
    let dbConnection = await ODBC.connect(getConnectionString);
    let rs = dbConnection.query(combined_query);
    console.log(rs);
    return rs;
  },
};
