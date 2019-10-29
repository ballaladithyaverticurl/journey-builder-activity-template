'use strict';


import axios from 'axios';
import { stringify } from 'qs';


    export default function getAccessToken()
    {
        var requestData = {
            'grant_type': 'password',
            'username': process.env.username,
            'password': process.env.password,
            'client_id': process.env.clientID,
            'client_secret': process.env.clientSecret
        }; 
       
        var encRequestData = stringify(requestData);

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
    };
