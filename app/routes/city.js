import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return this.store.findRecord('city', params.city_id);
  },
  actions: {
    save3(params) {
      var newRental = this.store.createRecord('rental', params);
      var city = params.city;
      city.get('rentals').addObject(newRental);
      newRental.save().then(function() {
        return city.save();
      });
      this.transitionTo('city', params.city);
    },
    destroyCity(city) {
      var rental_deletions = city.get('rentals').map(function(rental) {
        return rental.destroyRecord();
      });
      Ember.RVSP.all(rental_deletions).then(function() {
        return city.destroyRecord();
      });
      this.transitionTo('index');
    }
  }
});

// The following is line 7-15 in plain english:
// Create a new rental with the information from our parameters, save it to the database, and call it "newRental".
// Refer to the city in those parameters as "city".
// Retrieve the list of rentals located in "city", and add "newRental" to that list.
// Save "newRental", so it remembers what city it belongs in.
// Wait until "newRental" has finished saving, then save "city'" too, so it remembers it contains "newRental".
// Afterwards, take us to the page displaying details for "city".
