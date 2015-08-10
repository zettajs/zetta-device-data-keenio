var zetta = require('zetta');
var KeenCollector = require('../');

var collector = new KeenCollector({
  collection: 'My Collection',
  projectId: process.env.KEEN_PROJECT_ID,
  writeKey: process.env.KEEN_WRITE_KEY 
});

var hub = zetta()
  .name('cloud')
  .use(collector.collect())
  .listen(process.env.PORT || 3000);

