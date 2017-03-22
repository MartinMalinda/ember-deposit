export default function(  server  ) {

  /*
    Seed your development database using your factories.
    This data will not be loaded in your tests.

    Make sure to define a factory for each model you want to create.
  */

  let posts = server.createList('post', 10);
  let categories = server.createList('category', 5);

  
}
