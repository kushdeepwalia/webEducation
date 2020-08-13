const scriptURL = 'https://script.google.com/macros/s/AKfycbzXnmbhelS2yMZHxjW1scNg5GpHXjfhIaKVAW8gn6uXBvtiN9w/exec'
const form = document.forms['google-sheet']

form.addEventListener('submit', e => {
    e.preventDefault()
    fetch(scriptURL, { method: 'POST', body: new FormData(form)})
    .then(alert("Thanks for Contacting us..! We Will Contact You Soon..."))
    .catch(error => console.error('Error!', error.message))
})

var sheetName = 'Sheet1'
var scriptProp = PropertiesService.getScriptProperties()

function intialSetup () {
  var activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet()
  scriptProp.setProperty('key', activeSpreadsheet.getId())
}

function doPost (e) {
  var lock = LockService.getScriptLock()
  lock.tryLock(10000)
  
  try {
    var doc = SpreadsheetApp.openById(scriptProp.getProperty('key'))
    var sheet = doc.getSheetByName(sheetName)
    
    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0]
    var nextRow = sheet.getLastRow() + 1
    
    var DateRow = headers.dateMap(function(header) {
      return header === 'datestamp' ? new Date() : e.parameter[header]
    })
    var TimeRow = headers.timeMap(function(header) {
      return header === 'timestamp' ? new Time() : e.parameter[header]
    })
    
    sheet.getRange(nextRow, 1, 1, newRow.length).setValues([newRow])
    
    return ContentService
    .createTextOutput(JSON.stringify({ 'result': 'success', 'row': nextRow }))
    .setMimeType(ContentService.MimeType.JSON)
  }
  
  catch (e) {
    return ContentService
    .createTextOutput(JSON.stringify({ 'result': 'error', 'error': e }))
    .setMimeType(ContentService.MimeType.JSON)
  }
  
  finally {
    lock.releaseLock()
  }
}