var http = require('http');
var url  = require('url');
//fs module to read file
var fs = require('fs');
//csvtojson module to convert the csv to json
var Converter = require('csvtojson').core.Converter;
//csv filename
var fileName = './user.csv';
//open up filestream to read from csv file
var fileStream = fs.createReadStream(fileName);
//initilizing a csv converter
var csvConverter = new Converter({constructResult:true});
//json obj to store the callback from the converter
var JSONObj;

function textHandler(request, response) {
  console.log('received a request from ' + request.headers.host);
  console.log('resource requested: ' + request.url);
  
  response.writeHead(200, { 'Content-Type' : 'text/plain' });

  response.write('hello: ' + request.headers.host + '\n');
  response.write('  --> you requested ' + request.url);
  response.end();
}

function jsonHandler(request, response) {
  response.writeHead(200, { 'Content-Type' : 'text/json' });

  var obj = {
    host: request.headers.host,
    url : request.url
  };

  json = JSON.stringify(obj);
  response.write(json);
  response.end();
}
//storing the jsonObj that is parsed when the converter is turned on
csvConverter.on("end_parsed", function(jsonObj){
    JSONObj = jsonObj;
  });
//Activiating the converter for the filestream based on the csv
fileStream.pipe(csvConverter);

//new handler to deal with the new csv content type
function csvHandler(request, response){
  response.writeHead(200, { 'Content-Type' : 'text/csv' });
  //converting json to a string so it can be written back to the client
  json = JSON.stringify(JSONObj);
  response.write(json);
  response.end();
}

//make sure the process has the correct number or arguments
if (process.argv.length < 3) {
  console.log('usage: node http-server.js [text|json|csv]');
  process.exit(1);
}

//Make sure the handlerType is one of the predetermined types
var handlerType = process.argv[2];
if (!(handlerType === 'text' || handlerType === 'json' || handlerType === 'csv')) {
  console.log('usage: node http-server.js [text|json|csv]');
  process.exit(1);  
}

var server = null;

//Added another switch for the new handlerType to create a new type of server
switch (handlerType) {
  case 'text':
    server = http.createServer(textHandler);
    break;
  case 'json':
    server = http.createServer(jsonHandler);
    break;
  case 'csv':
    server = http.createServer(csvHandler);
    break;
  default:
    throw new Error('invalid handler type!');
}

server.listen(4000);
console.log('Server is listening!');
