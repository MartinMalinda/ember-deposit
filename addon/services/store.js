import Ember from 'ember';

const {inject} = Ember;

export default Ember.Service.extend({

  adapter: inject.service(),
  serializer: inject.service(),

  _data: {
    /*
      someModelName: [],
    */
  },

  _resources: {
    /*
      someModelName: {
        didFindAll: true/false
      }
    */
  },

  _queries: {
    /*
      modelName-paramString: []
    */
  },

  findAll(modelName){
    const fetchAll = this.get('adapter').findAll(modelName).then(findAllResponse => {
      let serializedModels = this.get('serializer').serializeArrayResponse(findAllResponse);
      this.set(`_data.${modelName}`, serializedModels);
      this.set(`_resources.${modelName}`, {didFindAll: true});
      return serializedModels;
    });

    if(this._resources[modelName] && this._resources[modelName].didFindAll){
      return this.peekAll(modelName);
    }

    return fetchAll;
  },

  findRecord(modelName, id){
    const peekedRecord = this.peekRecord(modelName, id);
    const fetchedRecord = this.get('adapter').findRecord(modelName, id).then(model => {
      // TODO: create a an object with IDs as keys to avoid findBy
      if(peekedRecord){
        peekedRecord.setProperties(model);
      }
    });

    if(peekedRecord){
      return peekedRecord;
    }
    
    return fetchedRecord;
  },

  // hasRecordForId(modelName, id){

  // },

  peekAll(modelName){
    return this.getWithDefault(`_data.${modelName}`, []);
  },

  peekRecord(modelName, id){
    return this.peekAll(modelName).findBy('id', id);
  },

  // query(modelName, params){

  // },

  queryRecord(){

  },

  // peekQuery(modelName, params){

  // },

  unloadRecord(){

  },

  unloadAll(){

  }
});
