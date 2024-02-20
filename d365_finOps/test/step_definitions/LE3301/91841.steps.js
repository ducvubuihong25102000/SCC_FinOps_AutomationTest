// const { Given, When, Then } = require("@cucumber/cucumber");
// const { browser, driver, $ } = require("@wdio/globals");
// const fs = require('fs');

// //Data model
// const credential = require("../../data/Logins.json");
// const dataFAPrecondition = require("../../data/91846_Precondition.json");
// const dataFAJournal = require("../../data/FixedAssetJournal.json");
// const dataFA = require("../../data/FixedAsset.json");

// //Global constants
// const { FIXED_ASSETS, PURCHASE_ORDER } = require("../constants/global.constant.js");

// //Page Objects
// const pageFOHomePage = require("../page_objects/FinopsHomepage.page.js");
// const pagePurchaseOrder = require("../page_objects/PurchaseOrder.page.js");
// const pageLogin = require("../page_objects/loginUser.page");
// const pageFixedAsset = require("../page_objects/FixedAsset.page.js");

// //FA data index
// const firstIndex = 0;
// const TCSID = "91841"

// // CSV Library
// const json2csv = require('json2csv').parse;
// const isPassed = "Passed";
// const fields = ['Description', 'Status'];
// const opts = { fields };

// Given(/^91841 User is on Purchase Order page$/, async() => {
//     await browser.refresh();
//     await pageFOHomePage.navigateTo(PURCHASE_ORDER);
//     await pagePurchaseOrder.OpenPORecordViaFilter(
//         dataFA.FixedAssets[firstIndex].FABookForm[firstIndex].TC91841[firstIndex].PurchaseOrderNumber
//     )
// })

// When(/^91841 User is request to change FA information$/, async() => {
//     // Open FA tab on PO
//     //     - select line 1 > open FA tab
//     //         - verify 1 line: New FA = YES, FA Group I-AICC(default group display as procurement), Txs type = Acqui
//     //     - select line 2 > open FA tab
//     //         - verify 2 line: New FA = NO, FA Group blank, Txs type = Acqui
//     // Click Purchase order tab > Request change
//     //     - Select 2 line on request change dialog
//     //     - On FA tab select a FA number(json)
//     //     - Change Txs type to Acquisition adjustment
//     //     - Book change to SLLR
//     //     - Save

//     await pagePurchaseOrder.Verify_User_Can_Change_FARecord_Via_RequestChange(
//         dataFA.FixedAssets[firstIndex].FABookForm[firstIndex].TC91841[firstIndex].FixedAssetGroup,
//         dataFA.FixedAssets[firstIndex].FABookForm[firstIndex].TC91841[firstIndex].TransactionType,
//         dataFA.FixedAssets[firstIndex].FABookForm[firstIndex].TC91841[firstIndex].IsitDirectorNote
//     )
// })

// Then(/^91841 Verify that user is changed sucessfully$/, async() => {
//     // Workflow > Submit  > Approve
// })

// Then(/^91841 User invoiced the PO above$/, async() => {

// })

// Then(/^91841 Verify user can see invoice voucher is stored correctly$/, async() => {

// })

// Then(/^91841 Navigate to Fixed Asset page and open desired Fixed asset$/, async() => {

// })

// Then(/^91841 Verify that FA Acquisition price is increased by unit price which enter above$/, async() => {

// })
