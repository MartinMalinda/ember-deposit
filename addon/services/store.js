import Ember from 'ember';

const {inject, A, isArray, Logger} = Ember;
const {resolve: resolveP} = Ember.RSVP;

export default Ember.Service.extend({

  adapter: inject.service(),
  serializer: inject.service(),

  init() {

    this.setProperties({
      _data: {
        /*
          someModelName: [],
        */
      },

      _resourceInfo: {
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

      _factories: {
        /*
          modelName: {}
        */
      }
    });

    this._super(...arguments);
  },

  modelFor(modelName){
    return this._factories[modelName] || this._getFactory(modelName);
  },

  _getFactory(modelName){
    let factory = Ember.getOwner(this).factoryFor(`model:${modelName}`);

    if(!factory){
      Logger.error(`Model for ${modelName} not found`);
    }

    this._factories[modelName] = factory;
    return factory;
  },

  _getModelsForResponse(modelName, response){
    let serializedResponse = this.get('serializer').serializeResponse(response);
    const Model = this.modelFor(modelName);

    if(isArray(serializedResponse)){
      return serializedResponse.map(obj => Model.create(obj));
    }

    return Model.create(serializedResponse);
  },

  findAll(modelName){
    const fetchAll = this.get('adapter').findAll(modelName).then(findAllResponse => {
      let models = this._getModelsForResponse(modelName, findAllResponse);

      this.set(`_data.${modelName}`, A(models));
      this.set(`_resourceInfo.${modelName}`, {didFindAll: true});

      return models;
    });

    if(this._resourceInfo[modelName] && this._resourceInfo[modelName].didFindAll){
      return resolveP(this.peekAll(modelName));
    }

    return fetchAll;
  },

  findRecord(modelName, id){
    const peekedRecord = this.peekRecord(modelName, id);
    const fetchedRecord = this.get('adapter').findRecord(modelName, id).then(findRecordResponse => {
      // TODO: create a an object with IDs as keys to avoid findBy

      const serializedObject = this.get('serializer').serializeSingleResponse(findRecordResponse);

      if(peekedRecord){
        peekedRecord.setProperties(serializedObject);
        return peekedRecord;
      } else {
        const Model = this.modelFor(modelName);
        return this.peekAll(modelName).pushObject(Model.create(serializedObject));
      }

    });

    return peekedRecord ? resolveP(peekedRecord) : fetchedRecord;
  },

  hasRecordForId(modelName, id){

  },

  peekAll(modelName){
    let collection = this.get(`_data.${modelName}`);

    if(collection){
      return collection;
    }

    let array = A([]);
    this.set(`_data.${modelName}`, array);

    return array;
  },

  peekRecord(modelName, id){
    return A(this.peekAll(modelName)).findBy('id', id + "");
  },

  _getQueryKey(modelName, params){
    const adapter = this.get('adapter');
    const queryString = adapter.serializeParams(params);
    return `${modelName}-${queryString}`;
  },

  query(modelName, params){

    const serializer = this.get('serializer');
    const peekedQuery = this.peekQuery(modelName, params);

    const fetchedQuery = this.get('adapter').query(modelName, params).then(queryResponse => {
      const models = this._getModelsForResponse(modelName, queryResponse);

      if(peekedQuery){

      } else {
        const queryKey = this._getQueryKey(modelName, params);
        this.set(`_queries.${queryKey}`, A(models));
      }

      return models;
    });

    return peekedQuery ? resolveP(peekedQuery) : fetchedQuery;
  },

  queryRecord(){
    return this.query(...arguments).then(models => models.get('firstObject'));
  },

  peekQuery(modelName, params){
    const key = this._getQueryKey(modelName, params);
    return this.get(`_queries.${key}`);
  },

  createRecord(modelName, dataHash){
    let model = this.modelFor(modelName).create(dataHash);
    return this.peekAll(modelName).pushObject(model);
  },

  unloadRecord(){

  },

  unloadAll(){

  }
});
