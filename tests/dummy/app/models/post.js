import Ember from 'ember';

const {inject} = Ember;

export default Ember.Object.extend({
  store: inject.service()
});
