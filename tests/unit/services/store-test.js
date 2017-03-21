import { moduleFor, test } from 'ember-qunit';
import { startMirage } from 'dummy/initializers/ember-cli-mirage';
import Ember from 'ember';

function isPromise(object){
  return typeof object === 'object' && object.then;
}

const {isArray} = Ember;


moduleFor('service:store', 'Unit | Service | store', {
  // Specify the other units that are required for this test.
  needs: ['service:adapter', 'service:serializer'],

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

test('findAll', function(assert){
  let service = this.subject();

  const allRecords = service.findAll('post');

  assert.ok(isPromise(allRecords), 'findAll returns a promise on first call');

  allRecords.then(posts => {
    assert.ok(isArray(posts), 'when the findAll promise is resolved, the promise returns an array');

    const allRecords2 = service.findAll('post');
    assert.ok(isArray(allRecords2), 'on a second call for findAll, array is returned right away');
  });

});
