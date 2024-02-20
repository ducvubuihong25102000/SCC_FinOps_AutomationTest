const fs = require('fs');

module.exports = {
  readJSONFile: function readJSONFile(file, callback) {
    let jsonContent = null;
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, '..', 'data', file);
    try {
      const jsonData = fs.readFileSync(filePath, 'utf8');
      jsonContent = JSON.parse(jsonData);

      if (callback) {
        callback(jsonContent);
      }

      return jsonContent;
    } catch (error) {
      console.error(
        `File not existing, create 'data/${file}' then run test again.`
      );
    }
  },
  extractAssertAttributes: function extractAssertAttributes(jsonObject) {
    let attributes = [];

    for (let attribute in jsonObject) {
      if (attribute.includes('Expected_')) {
        attributes.push(attribute);
      }
    }

    return attributes;
  },
};
