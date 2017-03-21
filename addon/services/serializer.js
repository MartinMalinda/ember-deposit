import Ember from 'ember';

export default Ember.Service.extend({

  serializeArrayResponse(arrayResponse){
    return arrayResponse.data.map(this.serializeSingleResource);
  },

  serializeSingleResource(resource){
    return resource.attributes;
  },

  serializeSingleResponse(singleResponse){
    return this.serializeSingleResource(singleResponse.data);
  }
});
