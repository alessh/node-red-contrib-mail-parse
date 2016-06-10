node-red-contrib-mail-parse
===========================

[![NPM](https://nodei.co/npm/node-red-contrib-mail-parse.png)](https://nodei.co/npm/node-red-contrib-mail-parse/)

[Node-Red][1] node to parse mime encoded e-mail messages using [mailparser][2].

This node parses raw source of e-mail messages in mime format into a structured object. This allows you to get access the e-mail properties and do something with it in your flows.

#Install

Run the following command in the root directory of your Node-RED install

    npm install node-red-contrib-mail-parse

### Common mail properties
Property | Method | Example
------------ | --- | ------------
to | msg.payload.to | [ { "address": "receiver@example.com", "name": "Receiver" } ]
from | msg.payload.from | [ { "address": "sender@example.com", "name": "Sender" } ]
subject | msg.payload.subject | Hello world!
body (html) | msg.payload.html | <code><html><body>How are you today?</body></html></code>
body (text) | msg.payload.text | How are you today?
attachments | msg.payload.attachments[] | *** see attachments object properties ***
number of attachments | msg.payload.attachments.length | 4

### All mail properties

  * **headers** - unprocessed headers in the form of - `{key: value}` - if there were multiple fields with the same key then the value is an array
  * **from** - an array of parsed `From` addresses - `[{address:'sender@example.com',name:'Sender Name'}]` (should be only one though)
  * **to** - an array of parsed `To` addresses
  * **cc** - an array of parsed `Cc` addresses
  * **bcc** - an array of parsed 'Bcc' addresses
  * **subject** - the subject line
  * **references** - an array of reference message id values (not set if no reference values present)
  * **inReplyTo** - an array of In-Reply-To message id values (not set if no in-reply-to values present)
  * **priority** - priority of the e-mail, always one of the following: *normal* (default), *high*, *low*
  * **text** - text body
  * **html** - html body
  * **date** - date field as a `Date()` object. If date could not be resolved or is not found this field is not set. Check the original date string from `headers.date`
  * **attachments** - an array of attachments

### Attachments properties
```javascript
attachments = [{
    contentType: 'image/png',
    fileName: 'image.png',
    contentDisposition: 'attachment',
    contentId: '5.1321281380971@localhost',
    transferEncoding: 'base64',
    length: 126,
    generatedFileName: 'image.png',
    checksum: 'e4cef4c6e26037bcf8166905207ea09b',
    content: <Buffer ...>
}];
```
#Nodes
![alt tag](https://raw.githubusercontent.com/alessandro-holanda/node-red-contrib-mail-parse/master/node.png)
![alt tag](https://raw.githubusercontent.com/alessandro-holanda/node-red-contrib-mail-parse/master/flow.png)
```json
[{"id":"70c00d9b.468a74","type":"debug","z":"2f3fbadc.6f0ae6","name":"to","active":false,"console":"false","complete":"payload.to","x":1050,"y":220,"wires":[]},{"id":"512a5203.adf10c","type":"mail-parse","z":"2f3fbadc.6f0ae6","name":"parse e-mail","x":750,"y":280,"wires":[["70c00d9b.468a74","ce8c0850.ed61a8","5658ba55.84f894","b0ed1a09.d7f9c8","c426369.c4b22c8","e14f2c24.15207"],["c390bdb2.61465","9a055e4d.67efe"]]},{"id":"8aeef9ea.674938","type":"file in","z":"2f3fbadc.6f0ae6","name":"from file \"email.eml\"","filename":"email1.eml","format":"utf8","x":500,"y":280,"wires":[["512a5203.adf10c"]]},{"id":"c6f05592.f86158","type":"inject","z":"2f3fbadc.6f0ae6","name":"trigger","topic":"","payload":"","payloadType":"date","repeat":"","crontab":"","once":false,"x":250,"y":280,"wires":[["8aeef9ea.674938"]]},{"id":"ce8c0850.ed61a8","type":"debug","z":"2f3fbadc.6f0ae6","name":"from","active":false,"console":"false","complete":"payload.from","x":1050,"y":180,"wires":[]},{"id":"5658ba55.84f894","type":"debug","z":"2f3fbadc.6f0ae6","name":"subject","active":false,"console":"false","complete":"payload.subject","x":1060,"y":260,"wires":[]},{"id":"b0ed1a09.d7f9c8","type":"debug","z":"2f3fbadc.6f0ae6","name":"attachments count","active":false,"console":"false","complete":"payload.attachments","x":1090,"y":380,"wires":[]},{"id":"e14f2c24.15207","type":"debug","z":"2f3fbadc.6f0ae6","name":"body (html)","active":false,"console":"false","complete":"payload.html","x":1070,"y":300,"wires":[]},{"id":"c426369.c4b22c8","type":"debug","z":"2f3fbadc.6f0ae6","name":"body (text)","active":false,"console":"false","complete":"payload.text","x":1070,"y":340,"wires":[]},{"id":"c390bdb2.61465","type":"debug","z":"2f3fbadc.6f0ae6","name":"attachments","active":true,"console":"false","complete":"payload","x":1070,"y":460,"wires":[]}]
```
![alt tag](https://raw.githubusercontent.com/alessandro-holanda/node-red-contrib-mail-parse/master/flow-with-attachment-validation.png)
```json
[{"id":"70c00d9b.468a74","type":"debug","z":"2f3fbadc.6f0ae6","name":"to","active":false,"console":"false","complete":"payload.to","x":1050,"y":220,"wires":[]},{"id":"512a5203.adf10c","type":"mail-parse","z":"2f3fbadc.6f0ae6","name":"parse e-mail","x":750,"y":280,"wires":[["70c00d9b.468a74","ce8c0850.ed61a8","5658ba55.84f894","b0ed1a09.d7f9c8","c426369.c4b22c8","e14f2c24.15207"],["c390bdb2.61465","9a055e4d.67efe"]]},{"id":"8aeef9ea.674938","type":"file in","z":"2f3fbadc.6f0ae6","name":"from file \"email.eml\"","filename":"email1.eml","format":"utf8","x":500,"y":280,"wires":[["512a5203.adf10c"]]},{"id":"c6f05592.f86158","type":"inject","z":"2f3fbadc.6f0ae6","name":"trigger","topic":"","payload":"","payloadType":"date","repeat":"","crontab":"","once":false,"x":250,"y":280,"wires":[["8aeef9ea.674938"]]},{"id":"ce8c0850.ed61a8","type":"debug","z":"2f3fbadc.6f0ae6","name":"from","active":false,"console":"false","complete":"payload.from","x":1050,"y":180,"wires":[]},{"id":"5658ba55.84f894","type":"debug","z":"2f3fbadc.6f0ae6","name":"subject","active":false,"console":"false","complete":"payload.subject","x":1060,"y":260,"wires":[]},{"id":"b0ed1a09.d7f9c8","type":"debug","z":"2f3fbadc.6f0ae6","name":"attachments count","active":false,"console":"false","complete":"payload.attachments","x":1090,"y":380,"wires":[]},{"id":"e14f2c24.15207","type":"debug","z":"2f3fbadc.6f0ae6","name":"body (html)","active":false,"console":"false","complete":"payload.html","x":1070,"y":300,"wires":[]},{"id":"c426369.c4b22c8","type":"debug","z":"2f3fbadc.6f0ae6","name":"body (text)","active":false,"console":"false","complete":"payload.text","x":1070,"y":340,"wires":[]},{"id":"c390bdb2.61465","type":"debug","z":"2f3fbadc.6f0ae6","name":"attachments","active":false,"console":"false","complete":"payload","x":1070,"y":460,"wires":[]},{"id":"9a055e4d.67efe","type":"xml-validate","z":"2f3fbadc.6f0ae6","name":"validate xsd schema","filename":"people.xsd","x":1100,"y":540,"wires":[["4ccfe452.85a07c"],["8c78b921.1c43f8"],["1a0e3fcd.ea861"]]},{"id":"4ccfe452.85a07c","type":"debug","z":"2f3fbadc.6f0ae6","name":"xml is valid !","active":false,"console":"false","complete":"fileName","x":1350,"y":500,"wires":[]},{"id":"8c78b921.1c43f8","type":"debug","z":"2f3fbadc.6f0ae6","name":"xml is invalid","active":false,"console":"false","complete":"fileName","x":1350,"y":560,"wires":[]},{"id":"1a0e3fcd.ea861","type":"debug","z":"2f3fbadc.6f0ae6","name":"show validation errors","active":true,"console":"false","complete":"payload","x":1380,"y":620,"wires":[]}]
```

#Author

[Alessandro Holanda][3]


[1]:http://nodered.org
[2]:https://www.npmjs.com/package/mailparser
[3]:https://github.com/alessh