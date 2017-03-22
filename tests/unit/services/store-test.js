import { moduleFor, test } from 'ember-qunit';
import { startMirage } from 'dummy/initializers/ember-cli-mirage';
import Ember from 'ember';

function isPromise(object){
  return typeof object === 'object' && object.then;
}

const {isArray} = Ember;


moduleFor('service:store', 'Unit | Service | store', {
  // Specify the other units that are required for this test.
  needs: ['service:adapter', 'service:serializer', 'service:ajax'],

  beforeEach() {
    this.server = startMirage();
  },
  afterEach() {
    this.server.shutdown();
  }
});

// Replace this with your real tests.
test('it exists', function(assert) {
  let store = this.subject();
  assert.ok(store);
});

test('findAll', function(assert){
  // assert.expect(3);
  
  let store = this.subject();

  const allRecords = store.findAll('post');

  assert.ok(isPromise(allRecords), 'findAll returns a promise on first call');

 // const promiseResolved = assert.async();


  allRecords.then(posts => {
    assert.ok(isArray(posts), 'when the findAll promise is resolved, it returns an array');

    const allRecords2 = store.findAll('post');
    assert.ok(isArray(allRecords2), 'on a second call for findAll, array is returned right away');

    promiseResolved();
  });
});

test('findRecord', function(assert){
  // assert.expect(4);

  let store = this.subject();
  const record = store.findRecord('post', 1);

  assert.ok(isPromise(record), 'findRecord returns a promise on first call');

 // const promiseResolved = assert.async();

  record.then(post => {
    assert.equal(typeof post, 'object', 'when the findRecord promise is resolved, it returns an object');
    assert.notEqual(typeof post.title, 'undefined', 'the object has a title');
    assert.notEqual(typeof post.content, 'undefined', 'the object has content');

    promiseResolved();
  });
});

test('query', function(assert){
  // assert.expect(4);
  let store = this.subject();
  const records = store.query('post', {title: 'Lorem ipsum 1'});

  assert.ok(isPromise(records), 'query returns a promise on first call');

  // const promiseResolved = assert.async();

  records.then(posts => {
    assert.ok(isArray(posts), 'when query promise is resolved, it returns an array');

    const queriedRecords2 = store.query('post', {title: 'Lorem ipsum 1'});
    assert.ok(isArray(queriedRecords2), 'on a second call for query with same params, array is returned right away');

    promiseResolved();
  });
});
