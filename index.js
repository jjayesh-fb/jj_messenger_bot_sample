// Messenger webhook code

const express = require('express');
const bodyParser = require('body-parser');

const app = express().use(bodyParser.json());
app.get('/', (req, res) => res.send('Hello World!'))
var port = process.env.PORT || 8080;
app.listen(port, () => console.log('Example app listening on port %d', port));

// Creates the endpoint for our webhook
app.post('/webhook', (req, res) => {

  let body = req.body;
  console.log('Entered the function');
  // Checks this is an event from a page subscription
  if (body.object === 'page') {
      body.entry.forEach(function(entry) {
        console.log('Entered the for loop');
        //Gets the message
        let webhook_event = entry.messaging[0];
        console.log(webhook_event);
      });

      // Send a '200 OK' response to all requests

      res.status(200).send('EVENT_RECEIVED');
       }
      else {
        res.sendStatus(404);
      }
  });

  // Adds support for GET requests to our webhook
app.get('/webhook', (req,res) =>{

  // Define the verify token
  let VERIFY_TOKEN = "JJFBMESSENGERBOTTOKEN";

  // parse the query params

  let mode = req.query['hub.mode'];
  let token = req.query['hub.verify_token'];
  let challenge = req.query['hub.challenge'];

  // Check if the query has both mode and verify_token

  if (mode && token) {
    // Check if the mode and token sent is correct
    if (mode === 'subscribe' && token === VERIFY_TOKEN)
    {
      console.log ('WEBHOOK_VERIFIED');
      res.status(200).send(challenge);
    }
    else {
      // Token does not match - Respond with 403
         res.sendStatus(403);

    }
  }
  else {
    // if mode and token are not present.....do nothing
  }

});
