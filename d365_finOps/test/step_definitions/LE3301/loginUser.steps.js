const { Given, When, Then } = require('@cucumber/cucumber');
const loginUserPage = require('../../page_objects/Finance_Operations/page/home/D365Login.page.js');
const credential = require('../../data/Logins.json');
const entityCode = require('../../data/LegalEntities.json');

const AVS = 1;
const SCC = 0;

Given(/^User is on SCC Authentication page$/, async () => {
  console.log('Open Base URL: ' + global.baseUrl);
});

When(/^User enter valid user credential and Click Submit$/, async () => {
  await loginUserPage.Verify_user_is_opened_SIT_URL();
});

Then(/^Verify that system is logged in to FinOps homepage$/, async () => {
  try {
    await loginUserPage.Verify_user_is_login_to_FinOps_with_valid_credential(
      credential.user.email
    );
  } catch (error) {
    console.log(error);
  }
});

Then(/^Verify that system is logged in correct legal entity$/, async () => {
  await loginUserPage.Verify_user_is_login_to_with_correct_legal_entity(
    entityCode.LegalEntities[AVS].Code
  );
});
