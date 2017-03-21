import { Factory } from 'ember-cli-mirage';

export default Factory.extend({

  isPost: true,

  title(i){
    return `Lorem Ipsum ${i}`
  },

  content(i){
    return `Lorem ipsum dolor sit amet ${i}`
  }
});
