const { Given, When, Then } = require('@cucumber/cucumber');
const { browser, driver, $ } = require('@wdio/globals');
const fs = require('fs');

//Data model
const dataWorkerPageDetail = require('../data/WorkerPageDetail.json');

//Page Object
const pageHRHomePage = require('../page-objects/HRHomepage.page.js');
const pageWorkerPageDetail = require('../page-objects/Create_Worker.page.js');

// Global constants
const {
  WORKER
} = require('./constants/global.const.js');

//Initiate test case ID for csv file
const TCSID = '7764';

// CSV Library
const json2csv = require('json2csv').parse;
const isPassed = 'Passed';
const fields = ['Description', 'Status'];
const opts = { fields };

//data model index
const firstIndex = 0;

When(/^7764 User Navigate to All Purchase Order$/, async () => {
  await pageHRHomePage.navigateTo(WORKER);
});

Then(
  /^7764 Expand the worker summary fast tab, observe all value$/,
  async () => {
    await pageWorkerPageDetail.VerifySummaryTabAppearWithCorrectData(
      dataWorkerPageDetail.FirstName,
      dataWorkerPageDetail.LastName,
      dataWorkerPageDetail.KnowAs,
      dataWorkerPageDetail.OfficeLocation,
      dataWorkerPageDetail.OfficeAddress
    );
  }
);

Then(
  /^7764 Expand the Personal information fast tab, Note the value in the Gender field$/,
  async () => {
    await pageWorkerPageDetail.VerifyPersonalInformationTabAppearWithCorrectData(
      dataWorkerPageDetail.Gender
    );
  }
);

Then(
  /^7776 Change the Wage code related to Employee$/,
  async () => {
    
  }
);
