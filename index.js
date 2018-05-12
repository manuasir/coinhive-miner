const CoinHive = require('coin-hive');
const http = require('http');

(async () => {

  try {
    // Create miner
    const miner = await CoinHive(process.env.SITEKEY); // Coin-Hive's Site Key

    // Start miner
    await miner.start();

    // Listen on events
    miner.on('found', () => console.log('Found!!'))
    miner.on('accepted', () => console.log('Accepted!!'))
    miner.on('update', data => console.log(`
    Hashes per second: ${data.hashesPerSecond}
    Total hashes: ${data.totalHashes}
    Accepted hashes: ${data.acceptedHashes}
  `));

    const requestHandler = (request, response) => {
      console.log(request.url)
      response.end('Running the Monero Miner!!')
    }

    const server = http.createServer(requestHandler)

    server.listen(process.env.PORT, (err) => {
      if (err) {
        return console.log('something bad happened', err)
      }

      console.log(`server is listening`)
    })
  } catch (err) {
    console.error('err!', err)
  }

  // Stop miner
  //setTimeout(async () => await miner.stop(), 60000);
})();