// create an Immediately Invoked Function Expression (IIFE) to run at startup
(function() {
  let LoadHeader = () => {
    /* use jquery to read the HTML from the shared header file
    then render this HTML content to the <header> element */
    $.get('./views/shared/header.html', (htmlData) => {
      $('header').html(htmlData);
  
      // after navbar loads, add JS event handlers to each link to load the correct page
      $('.navbar-brand, .nav-link').each(() => {
        $('.navbar-brand, .nav-link').on('click', (event) => {
          // cancel any default behaviour
          event.preventDefault();
  
          // change page title based on the id of the current link clicked
          document.title = $(event.currentTarget).prop('id');
  
          // get the contents of the selected page
          LoadContent();
        });
      });
    });
  }
  
  let LoadContent = () => {
    // get name of HTML file to load from document title
    let currentPage = document.title;
    $.get(`./views/${currentPage}.html`, (htmlData) => {
      $('main').html(htmlData);
  
      // use browser's History API to track the sequence of pages
      history.pushState({}, "", `/${document.title}`);
    })
  };
  
  let LoadFooter = () => {
    $.get('./views/shared/footer.html', (htmlData) => {
      $('footer').html(htmlData);
    });
  };

  // old js function syntax
  // function Start() {
  // modern js function syntax.  assign a variable to an anonymous function using a fat arrow =>
  let Start = () => {
      console.log('App Started');
      let x = 1;
      console.log(x);

      // Display Header w/navbar + Footer
      LoadHeader();
      LoadFooter();

      // fetch & show contacts
      getContacts((data) => {
        let list = document.getElementById('contactList');

        // create a new listItem for each contact
        data.forEach(contact => {
          let listItem = document.createElement('li');
          //listItem.innerText = contact.Name;
          listItem.innerHTML = `<a href="mailto:${contact.Email}">${contact.Name}</a>`;
          listItem.className = "list-group-item";
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

