'use strict';


const axios = require('axios').default;
const qs = require('qs');


    module.exports = {
      getAccessToken: function() {
       
        var requestData = {
            'grant_type': 'password',
            'username': process.env.username,
            'password': process.env.password,
            'client_id': process.env.clientID,
            'client_secret': process.env.clientSecret
        }; 
       
        var encRequestData = qs.stringify(requestData);
        var accessToken;

        return new Promise((resolve, reject) =>
        {
            axios({
                method: 'post',
                url: 'https://login.salesforce.com/services/oauth2/token',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                data: encRequestData
                  })
                  .then(function (response){
                    accessToken = response.data.access_token;
                    resolve(accessToken);
                  })
                  .catch(function(error){
                    reject(error);
                    console.log(error);
              });
        })
      },

      postToChatter: function(commentData, accessToken) {

        return new Promise((resolve, reject) =>
        {
            
            var headers = {};
            headers['Content-Type'] = 'application/json';
            if(accessToken)
            {
              headers['Authorization'] = 'Bearer ' + accessToken;
            }
            var postBody = { 
              "body" : {
                 "messageSegments" : [
                    {
                       "type" : "Text",
                       "text" : "created via API - " + commentData
                    },
                    {   
                       "type" : "Mention",
                       "id" : "0052v00000bwoNlAAI"
                    }]
                  },
              "feedElementType" : "FeedItem",
              "subjectId" : "0052v00000baLz0AAE"
           };

            axios({
                method: 'post',
                url: 'https://ap15.salesforce.com/services/data/v46.0/chatter/feed-elements',
                headers: headers,
                data: postBody
                  })
                  .then(function (response){
                    console.log("The POST request response is " + response.data);
                  })
                  .catch(function(error){
                    reject(error);
                    console.log(error);
              });
        })
      }
  }
