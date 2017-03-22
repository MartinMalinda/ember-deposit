import Ember from 'ember';

const {inject} = Ember;

export default Ember.Route.extend({

  store: inject.service(),

  model(){
    window.Store = this.get('store');
    return this.get('store').findAll('post');
  }
});
