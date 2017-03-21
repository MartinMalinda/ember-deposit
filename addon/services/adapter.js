import Ember from 'ember';
// import fetch from "ember-network/fetch";
import {pluralize} from 'ember-inflector';


const {computed, $} = Ember;

export default Ember.Service.extend({

  //host: '',
  //namespace: ''

  fetch(url){
    return $.get(url);
  },

  init(){
    this._super(...arguments);

    this.inflector = new Ember.Inflector(Ember.Inflector.defaultRules);
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
    return this.fetch(url);
  },

  urlForFindRecord(modelName, id){
    let pluralModelName = pluralize(modelName); //TODO do this only once
    return `${this.get('baseURL')}${pluralModelName}/${id}`;
  },

  findRecord(modelName, id){
    let url = this.urlForFindRecord(modelName, id);
    return this.fetch(url);
  },

  serializeParams(params){
    return $.param(params);
  },

  urlForQuery(modelName, params){
    let pluralModelName = pluralize(modelName); //TODO do this only once
    return `${this.get('baseURL')}${pluralModelName}?${this.serializeParams(params)}`;
  },

  query(modelName, params){
    return this.fetch(this.urlForQuery(modelName, params));
  },

  queryRecord(/* modelName, params */){
    return this.query(...arguments);
  },

  findHasMany(){

  },

  findBelongsTo(){

  }


});
