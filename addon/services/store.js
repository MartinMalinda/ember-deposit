import Ember from 'ember';

const {inject, A} = Ember;

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
    const fetchedRecord = this.get('adapter').findRecord(modelName, id).then(findRecordResponse => {
      // TODO: create a an object with IDs as keys to avoid findBy

      const serializedModel = this.get('serializer').serializeSingleResponse(findRecordResponse);

      if(peekedRecord){
        peekedRecord.setProperties(serializedModel);
      }

      return serializedModel;
    });

    return peekedRecord || fetchedRecord;
  },

  // hasRecordForId(modelName, id){

  // },

  peekAll(modelName){
    return this.getWithDefault(`_data.${modelName}`, []);
  },

  peekRecord(modelName, id){
    return A(this.peekAll(modelName)).findBy('id', id);
  },

  getQueryKey(modelName, params){
    const adapter = this.get('adapter');
    const queryString = adapter.serializeParams(params);
    return `${modelName}-${queryString}`;
  },

  query(modelName, params){

    const serializer = this.get('serializer');
    const peekedQuery = this.peekQuery(modelName, params);

    const fetchedQuery = this.get('adapter').query(modelName, params).then(queryResponse => {
      const serializedRecords = serializer.serializeArrayResponse(queryResponse);
      return serializedRecords;
    });

    return peekedQuery || fetchedQuery;
  },

  queryRecord(){

  },

  peekQuery(modelName, params){
    const key = this.getQueryKey(modelName, params);
    return this.get(`_queries.${key}`);
  },

  unloadRecord(){

  },

  unloadAll(){

  }
});
