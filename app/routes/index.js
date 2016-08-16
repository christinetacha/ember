import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.store.findAll('rental');
  },

  actions: {
    save3(params) {
      var newRental = this.store.createRecord('rental', params);
      newRental.save();
      this.transitionTo('index');
    },

    update(rental, params) {
      Object.keys(params).forEach(function(key) {
        if(params[key]!==undefined) {
          rental.set(key,params[key]);
        }
    });
    rental.save();
    this.transitionTo('index');
  },
    // The following is ^ in plain text:
    // For each key in the params,
    // if it is NOT undefined,
    // take the rental and set the property that matches the current key, to the value of the current key,
    // after looping through all of the keys, save the rental,
    // transition to the index route.

    destroyRental(rental) {
      rental.destroyRecord();
      this.transitionTo('index');
    }
  }
});
