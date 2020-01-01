const express = require('express');
const app = express();
const cors = require('cors');
const https = require('https');

app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello from App Engine!');
});

darksky_api_key = "";

search_engine_id = '';

google_api_key = '';


app.get( '/getCurrentLocationDetails', (req, res) => {
  let darkskyURL = 'https://api.darksky.net/forecast/' + darksky_api_key + '/' + req.query.latitude + ',' + req.query.longitude;
  console.log(darkskyURL);
  https.get(darkskyURL, (resp) => {
    let data = '';
    resp.on('data', (chunk) => {
      data += chunk;
    });

    resp.on('end', () => {
      data = JSON.parse(data);
      return res.send(data);
    });

  }).on('error', (e) => {
    console.error(e);
  });

});

app.get('/getFormLocationDetails', (req, res) => {
  let geocodeJSONURL = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + req.query.street.split(' ').join('+') + ','
    + req.query.city.split(' ').join('+') + ',' + req.query.state.split(' ').join('+') +
    '&key=' + google_api_key;

  https.get(geocodeJSONURL, (resp) => {

    let data = '';
    resp.on('data', (chunk) => {
      data += chunk;
    });

    resp.on('end', () => {
      data = JSON.parse(data);
      if(data.status === 'ZERO_RESULTS') {
        return res.send('');
      }

      let latitudeGeocode = data.results[0].geometry.location.lat;
      let longitudeGeocode = data.results[0].geometry.location.lng;

      let darkskyURL = 'https://api.darksky.net/forecast/' + darksky_api_key + '/' + latitudeGeocode + ',' + longitudeGeocode;

      https.get(darkskyURL, (resp) => {
        let data = '';
        resp.on('data', (chunk) => {
          data += chunk;
        });

        resp.on('end', () => {
          data = JSON.parse(data);
          return res.send(data);
        });

      }).on('error', (e) => {
        console.error(e);
      });
    });

  }).on('error', (e) => {
    console.error(e);
  });

});

app.get( '/getStateSeal', (req, res) => {
  let state = req.query.state.split(' ').join('%20');
  let searchEngineURL = "https://www.googleapis.com/customsearch/v1?q=" + state + "%20State%20Seal&cx=" + search_engine_id + "&imgSize=large&imgType=news&num=1&searchType=image&key=" + google_api_key;
  https.get(searchEngineURL, (resp) => {
    let data = '';
    resp.on('data', (chunk) => {
      data += chunk;
    });

    resp.on('end', () => {
      data = JSON.parse(data);
      return res.send(data);
    });

  }).on('error', (e) => {
    console.error(e);
  });
});

app.get('/getDayModalData', (req, res) => {
  let darkskyURL = 'https://api.darksky.net/forecast/' + darksky_api_key + '/' + req.query.lat + ',' + req.query.lon + ',' + req.query.timestamp;
  https.get(darkskyURL, (resp) => {
    let data = '';
    resp.on('data', (chunk) => {
      data += chunk;
    });

    resp.on('end', () => {
      data = JSON.parse(data);
      return res.send(data);
    });

  }).on('error', (e) => {
    console.error(e);
  });
});

app.get('/getAutoCompleteCityList', (req, res) => {
  let autoPlacesURL = 'https://maps.googleapis.com/maps/api/place/autocomplete/json?input='
    + req.query.input + '&types=(cities)&language=en&key=' + google_api_key;
  https.get(autoPlacesURL, (resp) => {
    let data = '';
    resp.on('data', (chunk) => {
      data += chunk;
    });

    resp.on('end', () => {
      data = JSON.parse(data);
      return res.send(data);
    });

  }).on('error', (e) => {
    console.error(e);
  });
});

// Listen to the App Engine-specified port, or 3000 otherwise
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
