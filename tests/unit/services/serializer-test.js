import { moduleFor, test } from 'ember-qunit';

moduleFor('service:serializer', 'Unit | Service | serializer', {
  // Specify the other units that are required for this test.
  // needs: ['service:foo']
});

// Replace this with your real tests.
test('it exists', function(assert) {
  let service = this.subject();
  assert.ok(service);
});

test('serializing', function(assert){
  let service = this.subject();
  const resourceObject = {
    attributes: {
      title: 'Lorem ipsum',
      content: 'Dolor sit amet'
    },

    relationships: {
    }
  };

  let serializedObject = service.serializeSingleResource(resourceObject);

  assert.deepEqual(serializedObject, {title: 'Lorem ipsum', content: 'Dolor sit amet'}, 'single resource is serialized successfully');


  const arrayResponse = {
    data: [resourceObject]
  };

  const serializedObjects = service.serializeArrayResponse(arrayResponse);

  assert.deepEqual(serializedObjects, [{title: 'Lorem ipsum', content: 'Dolor sit amet'}], 'array response is serialized successfully');

  const singleResponse = {
    data: resourceObject
  };

  const serializedObject2 = service.serializeSingleResponse(singleResponse);

  assert.deepEqual(serializedObject2, {title: 'Lorem ipsum', content: 'Dolor sit amet'});
});
