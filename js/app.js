// create an Immediately Invoked Function Expression (IIFE) to run at startup
(function() {
  function Start() {
        console.log('App Started');
        let x = 1;
        console.log(x);
    }; 
    
    // run the function
    window.addEventListener('load', Start);
    //console.log(x); this causes an Undefined error.  x only lives inside Start()
}
)();