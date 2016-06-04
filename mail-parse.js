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
    var RED = require(process.env.NODE_RED_HOME+"/red/red");    
    var util = require('util');

    function mailparse(config) {
        RED.nodes.createNode(this, config);
        this.name = config.name;    

        var node = this;
        node.on("input", function(msg) {
            try {

                var MailParser = require("mailparser").MailParser;
                var mailparser = new MailParser();
                
                /*var email = "From: 'Sender Name' <sender@example.com>\r\n"+
                        "To: 'Receiver Name' <receiver@example.com>\r\n"+
                        "Subject: Hello world!\r\n"+
                        "\r\n"+
                        "How are you today?";*/

                // send the email source to the parser 
                mailparser.write(msg.payload);
                mailparser.end();

                mailparser.on("end", function(mail){
                    msg.payload = mail;
                    node.send(msg); // object structure for parsed e-mail 
                });

            } catch(err) {
                node.error(err.message);
            }
        });                
    }

    //
    RED.nodes.registerType("mail-parse", mailparse);

}
