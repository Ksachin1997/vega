const XLSX = require("xlsx");

exports.parseAddresses = async (req, res, next) => {
  const file = req.file || {};

  try {
    const workbook = XLSX.read(file.buffer);
    let firstSheetName = workbook.SheetNames[0];
    let worksheetOne = workbook.Sheets[firstSheetName];
    let worksheetOneJSONData = XLSX.utils.sheet_to_json(worksheetOne, {
      raw: true,
    });

    let secondSheetName = workbook.SheetNames[1];
    let worksheetTwo = workbook.Sheets[secondSheetName];
    let worksheetTwoJSONData = XLSX.utils.sheet_to_json(worksheetTwo, {
      raw: true,
    });

    return res.json({
      status: true,
      data: { addresses: worksheetOneJSONData, ...worksheetTwoJSONData[0] },
      message: "",
    });
  } catch (error) {
    return res.json({
      status: false,
      data: {},
      message: "Invalid excel data format",
    });
  }
};