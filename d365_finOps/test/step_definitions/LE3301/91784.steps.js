// const { Given, When, Then } = require("@cucumber/cucumber");
// const { browser, driver, $ } = require("@wdio/globals");
// const fs = require('fs');

// //Data model
// const dataGL = require("../../data/GeneralLedger.json");

// //Global constants
// const { GENERAL_JOURNAL, ALL_CUSTOMER } = require("../constants/global.constant.js");

// //Page Objects
// const pageFOHomePage = require("../page_objects/FinopsHomepage.page.js");
// const pageGL = require("../page_objects/GeneralLedger.page.js");
// const pageCust = require("../page_objects/Customers.page.js");

// //FA data index
// const firstIndex = 0;
// const secondIndex = 1;

// const TCSID = "91784"

// // CSV Library
// const json2csv = require('json2csv').parse;
// const isPassed = "Passed";
// const fields = ['Description', 'Status'];
// const opts = { fields };

// When(/^91784 User is navigate to General journal page$/, async()=> {
//     await browser.refresh();
//     await pageFOHomePage.navigateTo(GENERAL_JOURNAL);
// })
// Then(/^91784 User create a new CS3 sale invoice journal$/, async()=> {
//     await pageGL.Create_New_General_Journal(
//         dataGL.GeneralJournalHeader[firstIndex].CS3SalesInvoice[firstIndex].Name
//     );
// })
// Then(/^91784 Fulfil the sale invoice journal for a customer then posted the journal$/, async()=> {
//     let voucherID = await pageGL.Create_New_Line_For_General_Journal(
//         dataGL.GeneralJournalLine[firstIndex].GeneralJournalLineDetail[firstIndex].Description,
//         dataGL.GeneralJournalLine[firstIndex].TCS91784[firstIndex].Account,
//         dataGL.GeneralJournalLine[firstIndex].GeneralJournalLineDetail[firstIndex].Debit,
//         dataGL.GeneralJournalLine[firstIndex].TCS91784[firstIndex].OffsetAccountType,
//         dataGL.GeneralJournalLine[firstIndex].TCS91784[firstIndex].OffsetAccount
//     )
//     await pageGL.Verify_GL_is_Posted_Sucessfully();

//     //Get the Voucher number to verify in the Bank Transaction
//     let dataArray = dataGL.GeneralJournalLine[firstIndex].TCS91784;
//     let objIndex = dataArray.findIndex((obj => obj.Voucher == ""));
//     dataArray[objIndex].Voucher = voucherID;
//     console.log(dataArray);
// })
// When(/^91784 User is navigate to Customer page$/, async()=> {
//     await browser.refresh();
//     await pageFOHomePage.navigateTo(ALL_CUSTOMER);
// })
// Then(/^91784 User is open Customer details form$/, async()=> {
//     await pageCust.OpenCustomerViaFilter(
//         dataGL.GeneralJournalLine[firstIndex].TCS91784[firstIndex].Account
//     )
// })
// Then(/^91784 Verify user can see the journal which is posted for a customer above should be stored correctly$/, async()=> {

// })
