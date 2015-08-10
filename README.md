# Zetta Keen.io data collection

Collect all your zetta sensor data, and put it into keen.io.

## Usage

```
npm install zetta-device-data-keenio
```

```javascript
var zetta = require('zetta');
var KeenCollector = require('zetta-device-data-keenio');

var collector = new KeenCollector({
  collection: 'My Collection',
  projectId: process.env.KEEN_PROJECT_ID,
  writeKey: process.env.KEEN_WRITE_KEY 
});

var hub = zetta()
  .name('cloud')
  .use(collector.collect())
  .listen(process.env.PORT || 3000);
```

## Docs

### Constructor

* arguments: A javascript object
* returns: nothing
* description: Initializes a new collector for sending data to keen.io. Required params in the options object are:
  * collection - The collection which events will be stored within keen.io.
  * projectId - The project id where you'll send events.
  * writeKey- The write key for the project where you'll send events.

### collect()

* arguments: nothing
* returns: nothing
* description: Starts the collection process from device data.
