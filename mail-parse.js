/*
  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at
  http://www.apache.org/licenses/LICENSE-2.0
  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/

module.exports = function (RED) {
    var util = require('util');
    var fs = require('fs');

    function mailparse(config) {
        RED.nodes.createNode(this, config);
        this.name = config.name;    

        var node = this;
        node.on("input", function(msg) {
            try {

                var MailParser = require("mailparser").MailParser;
                var mailparser = new MailParser({
                    streamAttachments: true
                });
                
                /*var email = "From: 'Sender Name' <sender@example.com>\r\n"+
                        "To: 'Receiver Name' <receiver@example.com>\r\n"+
                        "Subject: Hello world!\r\n"+
                        "\r\n"+
                        "How are you today?";*/

                mailparser.on("end", function(mail){
                    msg.payload = mail;
                    node.send(msg); // object structure for parsed e-mail

                });

                mailparser.on("attachment", function(attachment, mail){
                  //console.log('Attachment:' + attachment.generatedFileName);

                  var streamToString = function(stream, callback) {
                    var content = '';
                    stream.on('data', function(chunk) {
                      content += chunk;
                    });
                    stream.on('end', function() {
                      callback(content);
                    });
                  }

                  streamToString(attachment.stream, function(payload) {
                      var msg = { 
                        contentType: attachment.contentType, // 'image/png',
                        fileName: attachment.fileName, // 'image.png',
                        contentDisposition: attachment.contentDisposition, // 'attachment',
                        contentId: attachment.contentId, // '5.1321281380971@localhost',
                        transferEncoding: attachment.transferEncoding, // 'base64', 'quoted-printable'
                        length: attachment.length, // 126,
                        generatedFileNamefile: attachment.generatedFileNamefile, // 'image.png',
                        checksum: attachment.checksum, // 'e4cef4c6e26037bcf8166905207ea09b',
                        payload: payload
                      };
                      var msgs = [];
                      msgs.push(null);
                      msgs.push(msg);
                      node.send(msgs);
                  });

                });

                // send the email source to the parser 
                mailparser.write(msg.payload);
                mailparser.end();

            } catch(err) {
                node.error(err.message);
            }
        });                
    }

    //
    RED.nodes.registerType("mail-parse", mailparse);

}
