const { Given, When, Then } = require('@cucumber/cucumber');
const loginFinOps = require('../page-objects/login.page.js');

//Data Object
const credential = require('../data/credentials.json');

const AVS = 1;
const SCC = 0;
const firstIndex = 0;

Given(/^User is on SCC Authentication page$/, async () => {
  console.log('Open Base URL: ' + global.baseUrl);
  await loginFinOps.Verify_user_is_opened_SIT_URL();
});

When(/^User enter valid user credential and Click Submit$/, async () => {
  await loginFinOps.Verify_user_is_login_to_FinOps_with_valid_credential(
    credential.HRManager1.email,
    credential.HRManager1.password
  );
});

Then(/^Verify that system is logged in to FinOps homepage$/, async () => {
  await loginFinOps.Verify_user_is_opened_SIT_URL();
});

/*Then(/^Verify that system is logged in correct legal entity$/, async () => {
  await loginFinOps.Verify_user_is_login_to_with_correct_legal_entity(
    entityCode.LegalEntities[SCC].Code
  );
});*/
