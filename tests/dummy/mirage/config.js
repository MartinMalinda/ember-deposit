import {pluralize} from 'ember-inflector';

export default function() {

  // this.urlPrefix = 'http://localhost:7357';    // make this `http://localhost:8080`, for example, if your API is on a different server
  // this.namespace = '';    // make this `/api`, for example, if your API is namespaced
  // this.timing = 400;      // delay for each request, automatically set to 0 during testing


  let endpoints = ['post', 'category'];

  endpoints.forEach(endpoint => {
      let plural = pluralize(endpoint);

    // findAll
    this.get(`/${plural}`, (schema, request) => {
      let params = Object.keys(request.queryParams);
      if(params.length === 0){
        return schema[plural].all();
      }

      if(params[0] === 'ids'){
        // coalesce find requests
        return schema[plural].find(request.queryParams['ids']);
      }
      return schema[plural].where(request.queryParams);
    });
    // findOne
    this.get(`/${plural}/:id`, (schema, {params: {id: id}}) => {
      return schema[plural].find(id);
    });

    this.delete(`/${plural}/:id`, (schema, {params: {id: id}}) => {
      return schema[plural].find(id).destroy();
    });
  });

}
