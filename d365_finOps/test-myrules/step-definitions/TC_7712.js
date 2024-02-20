// Import services, frameworks and configurations
const CONNECTION_STRING = require('../config/db-conf.js');
const JSON_INTEGRATOR = require('../services/json_integrator');
const DB_INTEGRATOR = require('../services/db_integrator.js');
const CHAI = require('chai');

// Prepare test case data
const EXECUTING_TEST = require('path')
  .basename(__filename)
  .replace('.js', '.json');
console.log(`Getting sample test data: ${EXECUTING_TEST}`);

// Execute
JSON_INTEGRATOR.readJSONFile(EXECUTING_TEST, function (sampleData) {
  console.table(sampleData);

  sampleData.forEach(sample => {
    let assert_properties = JSON_INTEGRATOR.extractAssertAttributes(sample);
    let actual = DB_INTEGRATOR.executeQuery(sample);

    console.log(actual);

    assert_properties.forEach(element => {
      let convertedElement = element.replace('Expected_', '');
      console.log(
        `Expect ${sample[element]} to be equal ${actual[convertedElement]}`
      );

      // Do assert here ↓↓↓
      CHAI.expect(sample[element]).to.be.equal(actual[convertedElement]);
    });
  });
});
