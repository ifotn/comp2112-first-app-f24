// create an Immediately Invoked Function Expression (IIFE) to run at startup
(function() {
  // old js function syntax
  // function Start() {

  // modern js function syntax.  assign a variable to an anonymous function using a fat arrow =>
  let Start = () => {
      console.log('App Started');
      let x = 1;
      console.log(x);

      // fetch & show contacts
      getContacts((data) => {
        let list = document.getElementById('contactList');

        // create a new listItem for each contact
        data.forEach(contact => {
          let listItem = document.createElement('li');
          listItem.innerText = contact.Name;
          list.appendChild(listItem);
        });
      });        
  }; 
    
    // run the function
    window.addEventListener('load', Start);
    //console.log(x); this causes an Undefined error.  x only lives inside Start()
}
)();

let updateCounter = (() => {
  // now counter gets created and ininitalized to zero only once
  let counter = 0;

  return() => {
    // every click can use the same counter var now
    counter++;
    document.getElementById('counter').innerHTML = counter;
  }
  
})();

let getContacts = (callback) => {
  // use jquery to read then display our json file contents
  // the data param gets filled once all the data is read from the file
  $.getJSON('./data/contacts.json', (data) => {
    console.log(data);
    callback(data);
  });
}