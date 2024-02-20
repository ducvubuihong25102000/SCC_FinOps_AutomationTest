const ODBC = require('odbc');
const CHAI = require('chai');
const TC7712 = require('../test-myrules/data/myroles-data.json');
const {
  USERNAME,
  PWD,
  SERVERNAME,
  DBNAME,
} = require('../test-myrules/constant/db-conf.js');
const CONNECTION_STRING = `
DRIVER={ODBC Driver 17 for SQL Server};
SERVER=${SERVERNAME};
UID=${USERNAME};
PWD=${PWD};
Trusted_Connection=yes;
Encrypt=yes;
TrustServerCertificate=yes`;

/*TODO: 
 PRE-CONDITIONS: 
 - 
 STEPS: 
 refactor code, tdd oriented
 AUTHOR:	*/
/********************************************************************************************/

function assertRuleToBeEqualQueryResultBasedOnTCSID(expect, actual) {
  if (!expect || !actual) {
    // Assert fail or do something
    return console.log(
      `Assert Fail with exepect is ${expect} and actual is ${actual}`
    );
  }

  try {
    switch (expect.TCID) {
      case 7712:
        // Do assert here ↓↓↓
        CHAI.expect(expect.ExpectedData).to.be.equal(actual[0].FirstName);
        console.log(
          `Verify expected data ${expect.ExpectedData} to be equal actual data ${actual[0].FirstName} therefore test case ${expect.TCID} is passed`
        );
        break;
      case 7713:
        CHAI.expect(expect.ExpectedData).to.be.equal(actual[0].LastName);
        console.log(
          `Verify expected data ${expect.ExpectedData} to be equal actual data ${actual[0].LastName} therefore test case ${expect.TCID} is passed`
        );
        break;
      case 7714:
        CHAI.expect(expect.ExpectedData).to.be.equal(actual[0].RealName);
        console.log(
          `Verify expected data ${expect.ExpectedData} to be equal actual data ${actual[0].RealName} therefore test case ${expect.TCID} is passed`
        );
        break;
      case 7715:
        CHAI.expect(expect.ExpectedData).to.be.equal(actual[0].Gender);
        console.log(
          `Verify expected data ${expect.ExpectedData} to be equal actual data ${actual[0].Gender} therefore test case ${expect.TCID} is passed`
        );
        break;
      case 7716:
        CHAI.expect(expect.ExpectedData).to.be.equal(actual[0].SCCLocation);
        console.log(
          `Verify expected data ${expect.ExpectedData} to be equal actual data ${actual[0].SCCLocation} therefore test case ${expect.TCID} is passed`
        );
        break;
      case 7717:
        CHAI.expect(expect.ExpectedData).to.be.equal(actual[0].NonSCCLocation);
        console.log(
          `Verify expected data ${expect.ExpectedData} to be equal actual data ${actual[0].NonSCCLocation} therefore test case ${expect.TCID} is passed`
        );
        break;
      case 7718:
        CHAI.expect(expect.ExpectedData).to.be.equal(actual[0].Title);
        console.log(
          `Verify expected data ${expect.ExpectedData} to be equal actual data ${actual[0].Title} therefore test case ${expect.TCID} is passed`
        );
        break;
      default:
        break;
    }
  } catch (err) {
    console.log(err);
  }
}

// Function
async function queryToDatabase(expected) {
  const DB_CONNECTION = await ODBC.connect(CONNECTION_STRING);
  let combined_query = expected.Query + "'" + expected.EmploymentNumber + "'";
  let actual = await DB_CONNECTION.query(combined_query);
  assertRuleToBeEqualQueryResultBasedOnTCSID(expected, actual);
  DB_CONNECTION.close();
}

// Execute
function executeQuery(jsonObject) {
  for (let i = 0; i < jsonObject.length; i++) {
    queryToDatabase(jsonObject[i]);
  }
}
executeQuery(TC7712);
