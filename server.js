'use strict';

var request = require('superagent'),
    xml     = require('xml2js').parseString

var API  = 'http://web.mta.info/status/serviceStatus.txt',
    DEST = 'http://mta-status-parser.herokuapp.com/post'

request
  .get(API)
  .end(function (err, res) {
    if (err) {
      console.error('Error @ GET request!', err)
      process.exit(1)
    }

    // Parse XML result
    xml(res.text, function (err, json) {
      if (err) {
        console.error('Error @ XML parse!', err)
        process.exit(1)
      }

      console.log('Retrieved!')

      // Post the resulting JSON object to the DEST endpoint.
      request
        .post(DEST)
        .send(json)
        .set('Accept', 'application/json')
        .end(function (err, res) {
          if (err) {
            console.error('Error @ POST request!', err)
            process.exit(1)
          }

          console.log('POST request sent! Server response code is', res.statusCode)
          process.exit(0)
        })

    })

  })
