import Ember from 'ember';
import {pluralize} from 'ember-inflector';


const {computed, $, inject} = Ember;

export default Ember.Service.extend({

  //host: '',
  //namespace: ''

  ajax: inject.service(),

  doGET(url){
    return this.get('ajax').request(url);
  },

  baseURL: computed('host', function(){
    return `${this.getWithDefault('host', '/')}${this.getWithDefault('namespace', '')}`;
  }),

  urlForFindAll(modelName){
    let pluralModelName = pluralize(modelName); //TODO do this only once
    return `${this.get('baseURL')}${pluralModelName}`
  },

  findAll(modelName){
    let url = this.urlForFindAll(modelName);
    return this.doGET(url);
  },

  urlForFindRecord(modelName, id){
    let pluralModelName = pluralize(modelName); //TODO do this only once
    return `${this.get('baseURL')}${pluralModelName}/${id}`;
  },

  findRecord(modelName, id){
    let url = this.urlForFindRecord(modelName, id);
    return this.doGET(url);
  },

  serializeParams(params){
    return $.param(params);
  },

  urlForQuery(modelName, params){
    let pluralModelName = pluralize(modelName); //TODO do this only once
    return `${this.get('baseURL')}${pluralModelName}?${this.serializeParams(params)}`;
  },

  query(modelName, params){
    return this.doGET(this.urlForQuery(modelName, params));
  },

  queryRecord(/* modelName, params */){
    return this.query(...arguments);
  },

  findHasMany(){

  },

  findBelongsTo(){

  }


});
