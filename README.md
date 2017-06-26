# ember-deposit

Data layer for reading data from REST/JSON API.
Currently debugged only for my one specific usecase.
API is mostly similar to Ember data apart from a few differences.
`store.query` is cached.
Background reloading is partially implemented but not thoroughly tested.
Models are expected to be regular Ember Objects.
Currently no support for relationships. Since the usecase for this addon is to only read, not write, it is quite easy to manage them up via computed properties.


This README outlines the details of collaborating on this Ember addon.

## Installation

* `git clone <repository-url>` this repository
* `cd ember-deposit`
* `npm install`
* `bower install`

## Running

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).

## Running Tests

* `npm test` (Runs `ember try:each` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).
