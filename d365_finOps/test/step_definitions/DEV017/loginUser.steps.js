const { Given, When, Then } = require('@cucumber/cucumber');
const PAGE_LOGIN = require('../../page_objects/Finance_Operations/page/home/D365Login.page.js');
const DATA_CREDENTIAL = require('../../data/Logins.json');
const DATA_ENTITYCODE = require('../../data/LegalEntities.json');

const SCC_D365_Environment = require('../../config/config.json');
const {
  PROJHOME_TITLE,
  DYNAMIC_TITLE,
} = require('../../constants/home.constant.js');

const AVS = 1;
const SCC = 0;

//#region <FinOps Login ↓↓↓>
Given(/^User is on SCC FinOps Authentication page$/, async () => {
  await PAGE_LOGIN.openEnviroment(SCC_D365_Environment.FinOps.baseUrl);
});

When(/^User enter valid finops user credential and Click Submit$/, async () => {
  await PAGE_LOGIN.Verify_user_is_login_with_valid_credential(
    DATA_CREDENTIAL.user.email
  );
});

Then(/^Verify that system is logged in to FinOps homepage$/, async () => {
  await PAGE_LOGIN.Verify_user_is_on_correct_environment(FINHOME_TITLE);
});

Then(/^Verify that system is logged in correct legal entity$/, async () => {
  await PAGE_LOGIN.Verify_user_is_login_to_with_correct_legal_entity(
    DATA_ENTITYCODE.LegalEntities[AVS].Code
  );
});
//#endregion

//#region <Elements of ProjOps login ↓↓↓>
Given(/^User is on SCC ProjecOps Authentication page$/, async () => {
  await PAGE_LOGIN.openEnviroment(SCC_D365_Environment.ProjOps.baseUrl);
});

When(
  /^User enter valid projectops user credential and Click Submit$/,
  async () => {
    await PAGE_LOGIN.Verify_user_is_login_with_valid_credential(
      DATA_CREDENTIAL.user01.email,
      DATA_CREDENTIAL.user01.password
    );
  }
);

Then(/^Verify that system is logged in to ProjOps homepage$/, async () => {
  await PAGE_LOGIN.Verify_user_is_on_correct_environment(DYNAMIC_TITLE);
});
//#endregion
