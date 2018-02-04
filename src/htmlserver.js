const http = require('http');
const fs = require('fs');

const formidable = require("formidable");
const util = require('util');


module.exports.createhtmlSever = bot => {
//from w3 schools
  //const textChannelToSendTo = "395554251729928192";
  const textChannelToSendTo = "380251833366740992";
  const server = http.createServer((req, res) => {
    if (req.method.toLowerCase() == 'get') {
      displayForm(res);
    } else if (req.method.toLowerCase() == 'post') {
        processAllFieldsOfTheForm(req, res);
    }
  });

  const displayForm = res => {
    fs.readFile('niceform.html', (err, data) => {
      res.writeHead(200, {'Content-Type': 'text/html',
      'Content-Length': data.length
      });
      res.write(data);
      res.end();
    });
  }

  const processAllFieldsOfTheForm = (req, res) => {
      var form = new formidable.IncomingForm();

      form.parse(req,  (err, fields, files) => {
          console.log(fields.stuff);
          bot.channels.get(textChannelToSendTo).send(fields.stuff);
      });
  }

  server.listen(8080);
}
