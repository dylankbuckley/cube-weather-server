const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const https = require('https');

app.get('/cube', function(req, res) {

    https.get('https://api.darksky.net/forecast/a6ca4f3f545e50f2cb6cfc3378e90109/51.4618564,-0.1750192', (resp) => {
        let data = '';

        // A chunk of data has been recieved.
        resp.on('data', (chunk) => {
            data += chunk;
        });

        // The whole response has been received. Print out the result.
        resp.on('end', () => {
            let dataResponse = {
                "Summary": JSON.parse(data).currently.summary,
                "Temp": Math.round((JSON.parse(data).currently.temperature - 32) * 5/9)
            }
            res.send(dataResponse)
        });

        }).on("error", (err) => {
        console.log("Error: " + err.message);
    });
    
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))