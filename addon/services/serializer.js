import Ember from 'ember';

const {isArray} = Ember;

export default Ember.Service.extend({

  serializeResponse(response){
    if(isArray(response.data)){
      return this.serializeArrayResponse(response);
    }

    return this.serializeSingleResponse(response);
  },

  serializeArrayResponse(arrayResponse){
    return arrayResponse.data.map(this.serializeSingleResource);
  },

  serializeSingleResource(resource){
    let attrs = resource.attributes;
    attrs.id = resource.id;

    return attrs;
  },

  serializeSingleResponse(singleResponse){
    return this.serializeSingleResource(singleResponse.data);
  }
});
