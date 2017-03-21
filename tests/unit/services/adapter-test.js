import { moduleFor, test } from 'ember-qunit';
import { startMirage } from 'dummy/initializers/ember-cli-mirage';

moduleFor('service:adapter', 'Unit | Service | adapter', {
  // Specify the other units that are required for this test.
  // needs: ['service:foo']
  beforeEach() {
    this.server = startMirage();
  },
  afterEach() {
    this.server.shutdown();
  }
});

// Replace this with your real tests.
test('it exists', function(assert) {
  let service = this.subject();
  assert.ok(service);
});

test('findAll and findRecord', function(assert){
  let service = this.subject();


  let urlForFindAll = service.urlForFindAll('post');
  assert.equal(urlForFindAll, '/posts');

  let response = service.findAll('post');

  response.then(posts => {
    assert.ok(posts);
  });

  let urlForFindRecord = service.urlForFindRecord('post', 1);
  assert.equal(urlForFindRecord, '/posts/1');

  service.findRecord('post', 1).then(post => {
    assert.ok(post);
  });
});

test('query and queryRecord', function(assert){
  let service = this.subject();

  let params = {title: 'title 1'};
  let serializedParams = service.serializeParams(params);

  assert.equal(serializedParams, 'title=title%201');

  let params2 = {title: 'title 2', page: '1'};

  assert.equal(service.serializeParams(params2), 'title=title%202&page=1');

  let urlForQuery = service.urlForQuery('post', params2);

  assert.equal(urlForQuery, '/posts?title=title%202&page=1');

  service.query('post', params2).then(posts => {
    assert.ok(posts);
  });

  service.queryRecord('post', params2).then(posts => {
    assert.ok(posts);
  });

});
