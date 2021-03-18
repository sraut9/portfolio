const axios = require('axios');
const cheerio = require('cheerio');

async function getData (html) {
	const $ = await cheerio.load(html);
	const priceStr = $('#ltpid_nse').text();

	const last_price = Number(priceStr);

	//console.log(last_price);
    return last_price;
}

module.exports = {
    getPrice: async function (share_data, url) {

        share_data.last_nav_price = 0;

        //console.log(url);
        await axios.get(url)
        .then(async response => {
            share_data.last_nav_price = await getData(response.data);
            //console.log("share_data: :::: " + share_data);
            return share_data.last_nav_price;
        })
        .catch(error => {
            console.log(error);
        })
    }
  };