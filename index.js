const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000;

// Your Prowlarr details
const PROWLARR_URL = process.env.PROWLARR_URL;
const PROWLARR_USER = process.env.PROWLARR_USER;
const PROWLARR_PASS = process.env.PROWLARR_PASS;

app.get('/health', async (req, res) => {
  try {
    const response = await axios.get(PROWLARR_URL, {
      auth: {
        username: PROWLARR_USER,
        password: PROWLARR_PASS
      }
    });
    if (response.status === 200) {
      res.send('Prowlarr is OK');
    } else {
      res.status(500).send('Prowlarr responded but not healthy.');
    }
  } catch (error) {
    res.status(500).send(`Prowlarr check failed: ${error.message}`);
  }
});

app.listen(port, () => {
  console.log(`Health proxy running on port ${port}`);
});
