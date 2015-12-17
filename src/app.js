var UI = require('ui');
var ajax = require('ajax');


var card = new UI.Card({
  title: ' HSGR',
  icon: 'images/hsgr.png',
  subtitle: 'fetching...'
});

card.show();

// Door API
var doorURL = 'https://www.hackerspace.gr/api.php?action=query&prop=revisions&rvprop=content&format=json&titles=Network/Leases';

// Do the request
ajax(
  {
    url: doorURL,
    type: 'json'
  },
  function(data) {
    // Success!
    console.log("Successfully fetched hackers!");

    // Extract data and randomize
    var hackers = data.query.pages[168].revisions[0]["*"];
    var the_text = random_joke(hackers);

    // Show to user
    if (hackers == "0") {
      card.subtitle('Closed');
    } else {
      card.subtitle('Open');
    }
    card.body(the_text);
  },
  function(error) {
    // Failure!
    console.log('Failed fetching hackers: ' + error);
  }
);

function random_joke(hackers) {
  var random_no = Math.floor((Math.random()*10)+2);
  var skadalia = [
    'thieves',
    'ghosts',
    'rats',
    'mosquitos',
    'resistors',
    'capacitors',
    'supermodels',
    'astronauts',
    'aliens',
    'M$ users',
    'books',
    'unicorns',
    'nyan cats',
    'ground stations'
  ];
  var random_text = Math.floor(Math.random()*skadalia.length);
  var joke = hackers + ' hackers and ' + random_no + ' ' + skadalia[random_text] + ' in space!';
  
  return joke;
}
