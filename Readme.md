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
![alt tag](https://raw.githubusercontent.com/alessandro-holanda/node-red-contrib-mail-parse/master/flow-with-attachment-validation.png)

#Author

[Alessandro Holanda][3]


[1]:http://nodered.org
[2]:https://www.npmjs.com/package/mailparser
[3]:https://github.com/alessandro-holanda