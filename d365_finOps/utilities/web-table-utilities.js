
export default class WebTable {

    constructor(webTable) {
        this.webTable = webTable;
    }

    // get the number of rows present
    getRowCount() {
        console.log("Fetching number rows");
        return this.webTable.$$("tr").length - 1;
    };

    // get the number of columns present
    getColumnCount() {
        return this.webTable.$$("th").length
    };

    // get row data and return it as list
    getRowData(rowNumber) {
        if (rowNumber == 0) {
            throw new Error("Row number starts from 1");
        }
        var columnNumber = this.getColumnCount();
        var values = [];
        for(var i = 1; i <= columnNumber; i++) {
            values[i - 1] = this.webTable.$("//tr[" + rowNumber + "]/th[" + i + "]").getText();
        }
        return values;
    };

    // get the column data and return as list in webdriverio
    getColumnData(columnNumber) {
        if (columnNumber == 0) {
            throw new Error("Column number starts from 1");
        }
        var rowNumber = this.getRowCount();
        console.log(rowNumber);
        var values = [];
        for(var i = 2; i <= rowNumber + 1; i++) {
            values[i - 2] = this.webTable.$("//tr[" + i + "]/td[" + columnNumber + "]").getText();
        }
        return values;
    };

    // get all the data from the table
    getAllData() {
        var rowNumber = this.getRowCount();
        var columnNumber = this.getColumnCount();

        var allData = new Array(rowNumber);
        for(var i = 0; i < rowNumber; i++) {
            allData[i] = new Array(columnNumber);
        }
        for(var i = 2; i <= rowNumber + 1; i++) {
            for(var j = 1; j <= columnNumber; j++) {
                allData[i - 2][j - 1] = this.webTable.$("//tr[" + i + "]/td[" + j + "]").getText();
            }
        }
        return allData;
    };

    // get the data from a specific cell
    getCellData(rowNumber, columnNumber) {
        if (rowNumber == 0) {
            throw new Error("Row number starts from 1");
        }
        rowNumber = rowNumber + 1;
        let cellData = this.webTable.$("//tr[" + rowNumber + "]/td[" + columnNumber + "]").getText();
        return cellData;
    };

}