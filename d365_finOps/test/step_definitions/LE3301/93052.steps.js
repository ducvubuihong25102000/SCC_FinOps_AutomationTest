const { Given, When, Then } = require('@cucumber/cucumber');
const { browser, driver, $ } = require('@wdio/globals');
const fs = require('fs');

//Data model
const dataIJ = require('../../data/InvoiceJournal.json');

//Global constants
const { INVOICE_JOURNAL } = require('../../constants/global.constant.js');

//Page Objects
const pageIJ = require('../../page_objects/Finance_Operations/page/invoice_journal/InvoiceJournal.page.js');
const pageFOHomepage = require('../../page_objects/Finance_Operations/page/home/FinopsHomepage.page.js');

// Initiate test case ID for csv file
const TCSID = '93052';

// CSV export variables
const json2csv = require('json2csv').parse;
const isPassed = 'Passed';
const fields = ['Description', 'Status'];
const opts = { fields };

// Data model index
const firstIndex = 0;

/*>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Steps Action for TC-92900 <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<*/

When(/^93052 user navigate to the Invoice journal page$/, async () => {
  await browser.refresh();
  await pageFOHomepage.navigateTo(INVOICE_JOURNAL);
});

Then(
  /^93052 User create a Invoice Journal for desire FA then validate and post the invoice journal$/,
  async () => {
    await pageIJ.Verify_New_Invoice_Journal_Should_Be_Created(
      dataIJ.InvoiceJournal.InvoiceJournalHeader[firstIndex].Name,
      dataIJ.InvoiceJournal.InvoiceJournalHeader[firstIndex].DescriptionJN,
      dataIJ.InvoiceJournal.InvoiceJournalDetailsForm[firstIndex].Voucher,
      dataIJ.InvoiceJournal.InvoiceJournalDetailsForm[firstIndex].AccountType,
      dataIJ.InvoiceJournal.InvoiceJournalDetailsForm[firstIndex].Account,
      dataIJ.InvoiceJournal.InvoiceJournalDetailsForm[firstIndex].Invoice,
      dataIJ.InvoiceJournal.InvoiceJournalDetailsForm[firstIndex].Debit,
      dataIJ.InvoiceJournal.InvoiceJournalDetailsForm[firstIndex].TotalAmount,
      dataIJ.InvoiceJournal.InvoiceJournalDetailsForm[firstIndex].OffsetAccount,
      dataIJ.InvoiceJournal.InvoiceJournalDetailsForm[firstIndex]
        .OffsetAccountType,
      dataIJ.InvoiceJournal.InvoiceJournalDetailsForm[firstIndex].Description
    );

    // CSV export
    dataIJ.InvoiceJournal.InvoiceJournalDetailsForm[firstIndex].Status =
      isPassed;
    const csv = json2csv(dataIJ.InvoiceJournal.InvoiceJournalDetailsForm, opts);

    // Export
    fs.writeFileSync(`E:/QuocTD01/${TCSID}.csv`, csv);
    console.log('File CSV export success!');
  }
);
