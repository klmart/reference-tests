import {assert} from 'chai';
import {payload, people} from '../serialization';
// you can ge row data form payload.js file

describe('payload', function () {

  // in this tests try to use as least as possible number of assignments

  const CARS = payload.data.filter(function (item) {
    return item.type === 'Car'
  });

  it('car quantity with owners older than 20 years', function () {

    let answer;
    let carOwners = [];

    CARS.forEach(function (car) {
      car.owners.forEach(function (owner) {
        carOwners.push(owner);
      });
    });

    answer = carOwners.filter(function (owner) {
      return owner.personalInfo.age > 20
    }).length;

    assert.equal(answer, 2);

  });

  it('all car colors separated by comma without duplicates', function () {

    let answer;

    let carColors = CARS.map(function (car) {
      return car.attrs.color
    });

    function uniqueVal(value, index, self) {
      return self.indexOf(value) === index;
    }

    answer = carColors.filter(uniqueVal)
                      .join(',');

    assert.equal(answer, 'red,yellow');

  });

  it('id\'s of all vehicles separated by comma', function () {

    let answer;

    let vehicles = payload.data.filter(function (item) {
      if (item.type === 'Car') {
        return item
      }

      if (item.type === 'Bicycle') {
        return item
      }
    });

    answer = vehicles.map(function (vehicle) {
      return vehicle.id
    })
                     .join(',');

    assert.equal(answer, '1,3,6,4,2');

  });

  it('summary price of all items', function () {

    let answer;
    let priceOfItems = payload.data.map(function (item) {
      return item.attrs.price
    });

    answer = priceOfItems.reduce((a, b) => a + b, 0);

    assert.equal(answer, 42800);

  });

  it('price of all things john has own', function () {

    let answer;

    let johnsThings = [];

    payload.data.forEach(function (item) {
      item.owners.forEach(function (owner) {
        if (owner == people.johnSmith) {
          johnsThings.push(item);
        }
      });
    });

    answer = johnsThings.map(function (thing) {
      return thing.attrs.price
    })
                        .reduce((a, b) => a + b, 0);

    assert.equal(answer, 25000);

  });

  it('all cities', function () {

    let answer;
    let owners = [];
    let cities = [];

    payload.data.forEach(function (item) {
      item.owners.forEach(function (owner) {
        owners.push(owner);
      })
    });

    function uniqueVal(value, index, self) {
      return self.indexOf(value) === index;
    }

    let uniqueOwners = owners.filter(uniqueVal);

    uniqueOwners.forEach(function (owner) {
      owner.cities.forEach(function (city) {
        cities.push(city)
      })
    });

    answer = cities.join(',');

    assert.equal(answer, 'New York,Boston,Columbia,Rapture');

  });
});
