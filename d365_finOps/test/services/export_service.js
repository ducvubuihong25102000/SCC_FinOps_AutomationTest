module.exports = {
  writeToCSV: function writeToCSV(data, fileName) {
    const path = require('path');
    const fs = require('fs');
    var json2CSV = require('json2csv').parse;

    var fields = ['ID', 'Status'];
    var opts = { fields };
    var newLine = '\r\n';

    // Output current folder
    const filename = path.join(
      __dirname,
      '../../test-report/test-exec',
      `${fileName}`
    );
    let rows;
    // If file doesn't exist, we will create new file and add rows with headers.
    if (!fs.existsSync(filename)) {
      rows = json2CSV(data, opts);
    } else {
      // Rows without headers.
      rows = json2CSV(data, { header: false }, opts);
    }
    // Append file function can create new file too.
    fs.appendFileSync(filename, rows);
    // Always add new line if file already exists.
    fs.appendFileSync(filename, newLine);
  },
};
