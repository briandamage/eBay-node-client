'use strict';

var clientId = process.env.EBAY_CLIENT_ID || 'YOUR_KEY';
var clientSecret = process.env.EBAY_CLIENT_SECRET || 'YOUR_SECRET';

var eBay = require('../../../../lib/eBay-node-client')(clientId, clientSecret);

var categoryRequest = async function () {
    try {
        var token = await eBay.application.getOAuthToken({
            grant_type: 'client_credentials',
            scope: 'https://api.ebay.com/oauth/api_scope'
        });
        eBay.setToken(token.access_token);
    } catch (error) {
        console.log('error ', error);
        return;
    }

    var categoryTreeId = 203;
    var data = {
        category_id: '179623'
    };
    try {
        var response = await eBay.taxonomy.getCategorySubtree(categoryTreeId, data);
        console.log('response', response);
    } catch (error) {
        console.log('error ', error);
        return;
    }
};

categoryRequest();
