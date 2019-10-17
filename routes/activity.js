'use strict';
var util = require('util');


// Deps
const Path = require('path');
const JWT = require(Path.join(__dirname, '..', 'lib', 'jwtDecoder.js'));
var util = require('util');
var http = require('https');

exports.logExecuteData = [];

function logData(req) {
    exports.logExecuteData.push({
        body: req.body,
        headers: req.headers,
        trailers: req.trailers,
        method: req.method,
        url: req.url,
        params: req.params,
        query: req.query,
        route: req.route,
        cookies: req.cookies,
        ip: req.ip,
        path: req.path,
        host: req.host,
        fresh: req.fresh,
        stale: req.stale,
        protocol: req.protocol,
        secure: req.secure,
        originalUrl: req.originalUrl
    });
    console.log("body: " + util.inspect(req.body));
    console.log("headers: " + req.headers);
    console.log("trailers: " + req.trailers);
    console.log("method: " + req.method);
    console.log("url: " + req.url);
    console.log("params: " + util.inspect(req.params));
    console.log("query: " + util.inspect(req.query));
    console.log("route: " + req.route);
    console.log("cookies: " + req.cookies);
    console.log("ip: " + req.ip);
    console.log("path: " + req.path);
    console.log("host: " + req.host);
    console.log("fresh: " + req.fresh);
    console.log("stale: " + req.stale);
    console.log("protocol: " + req.protocol);
    console.log("secure: " + req.secure);
    console.log("originalUrl: " + req.originalUrl);
}

/*
 * POST Handler for / route of Activity (this is the edit route).
 */
exports.edit = function (req, res) {
    // Data from the req and put it in an array accessible to the main app.
    //console.log( req.body );
    logData(req);
    res.send(200, 'Edit');
};

/*
 * POST Handler for /save/ route of Activity.
 */
exports.save = function (req, res) {
    // Data from the req and put it in an array accessible to the main app.
    //console.log( req.body );
    logData(req);
    res.send(200, 'Save');
};

/*
 * POST Handler for /execute/ route of Activity.
 */
exports.execute = function (req, res) {

        // Debug post requests to requestbin
        /* var request = require('request');
        request.post('https://en2q78yix2nud.x.pipedream.net', {
          json: {
            Todo : 'Attend the call today'
          }
        }, (error, res, body) => {
          if (error) {
            console.error(error)
            return
          }
          console.log(`statusCode: ${res.statusCode}`)
          console.log(body)
        }) */

      var request = require('request');
      var requestData = {
          "grant_type": "password",
          "username": "dineshkumar.r@verticurl.com",
          "password": "Verticurl2019@!ytWK9ZCAiZd4Xs62JcHG74O0",
          "client_id": "3MVG9G9pzCUSkzZuCzlMok8v04ZD9hAV.QwYbU0KngmXzKFXRUrN_Gu7Mdq2wlnQZhZgv52V87MXa6k4_95pb",
          "client_secret": "1C7BA3CE59530C51194C8A811F64D011B8C3EE144DF3EA13D37F4F7CEA9187C3"
      };

        
      request({
        url: "https://login.salesforce.com/services/oauth2/token",
        headers: {'Content-Type': 'application/json'},
        method: "POST",
        json: requestData
      }, function(err, res, body) {
          console.log(err);
          console.log(res);
          console.log(body);
          if (!err && res.statusCode == 200) {
              accessToken = body.access_token;
              request.post('https://en2q78yix2nud.x.pipedream.net', {
                  json: {
                    accessToken : accessToken
                  }
                }, (error, res, body) => {
                  if (error) {
                    console.error(error)
                    return
                  }
                  console.log(`statusCode: ${res.statusCode}`)
                  console.log(body)
                });
          } else {
            request.post('https://en2q78yix2nud.x.pipedream.net', {
                json: {
                  Error : err
                }
              }, (error, res, body) => {
                if (error) {
                  console.error(error)
                  return
                }
                console.log(`statusCode: ${res.statusCode}`)
                console.log(body)
              });
          }
      });

      
    };



/*
 * POST Handler for /publish/ route of Activity.
 */
exports.publish = function (req, res) {
    // Data from the req and put it in an array accessible to the main app.
    //console.log( req.body );
    logData(req);
    res.send(200, 'Publish');
};

/*
 * POST Handler for /validate/ route of Activity.
 */
exports.validate = function (req, res) {
    // Data from the req and put it in an array accessible to the main app.
    //console.log( req.body );
    logData(req);
    res.send(200, 'Validate');
};