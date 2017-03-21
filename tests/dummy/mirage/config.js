export default function() {

  // These comments are here to help you get started. Feel free to delete them.

  /*
    Config (with defaults).

    Note: these only affect routes defined *after* them!
  */

  // this.urlPrefix = 'http://localhost:7357';    // make this `http://localhost:8080`, for example, if your API is on a different server
  // this.namespace = '';    // make this `/api`, for example, if your API is namespaced
  // this.timing = 400;      // delay for each request, automatically set to 0 during testing

  
    // Shorthand cheatsheet:


    this.get('/posts', () => {
      // debugger;
      return this.createList('post', 10);
      // return this.schema.posts.all();
    });


    // this.post('/posts');
    // this.get('/posts/:id');
    // this.put('/posts/:id'); // or this.patch
    // this.del('/posts/:id');


    // http://www.ember-cli-mirage.com/docs/v0.2.x/shorthands/
  
}
