// Variables that are used as a jquery selector have a $infront. Like this: $var

// Ready function, slighty different from what we learned in class because the internet told me that this is "best practice". This way of invoking the ready function prevents potential problems with jquery if another javascript library uses the $ symbol
(function($, window, document) {

  // Function to initialize the webpage. Hides the amount of items in each cart as well as total number of items in cart. In a function to keep the code clean
  const initializeWebpage = () => {
    $('.amount-in-cart').slideUp(1);
    $('.items-in-cart').hide();
  }
  
  // Function to hide or show the bubble that will display the total number of items in the cart. If it is 0 it will fade away. If it is more than 0 it will fade into view
  const displayTotalItemsInCart = () => {
    const $totalItemsInCart = $('.items-in-cart');
    if ($totalItemsInCart.html() === '0') {
      $totalItemsInCart.hide(500);
    } else {
      $totalItemsInCart.show(500);
    }
  }
  
  // invoke intialize webpage function. Underneath display items in cart to prevent an error in invoking a function that has yet to be declared
  initializeWebpage();

  // Special smooth scrolling event listener because the general smooth scrolling event listener function doesn't work with the #top href. For some reason the hash property doesn't return a value for #top
  $('#logo a').on('click', event => {
    // prevent default snap to top
    event.preventDefault();
    // scroll to the top over 500 milliseconds
    $('html, body').animate({
      scrollTop: $('.hero-banner').offset().top - 200
    }, 500); return false
  });

  // General smooth scrolling event listener. Will work for all except for #top
  // Attach to all anchor tags, exclude anchor tags with empty hrefs or hrefs that don't lead anywhere
  $('a[href*="#"]')
  .not('[href="#"]')
  .not('[href="#0"]')
  .click(function(event) {
    // Checking if the anchor tag will lead to another location on this site. Will exclude anchor tags that lead out of this page
    if (
      location.pathname.replace(/^\//, '') == event.currentTarget.pathname.replace(/^\//, '')
      && 
      location.hostname == event.currentTarget.hostname
    ) {
      // Selecting the target. The hash property selects the href value. For some reason #top does not work with the hash property and so a special event listener will smooth scroll #top
      let target = $(event.currentTarget.hash);
      // Removing unnecessary components of what the hash property returns for a valid target to smooth scroll to
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      // Double checks it is a proper target
      if (target.length) {
        // Prevent default snap to position
        event.preventDefault();
        // Scroll to target location over 800 milliseconds, slightly above exact target location to accomodate for header covering the content
        $('html, body').animate({
          scrollTop: target.offset().top - 120
        }, 800, () => {
          // changes focus to target element
          var $target = $(target);
          $target.focus();
          // checks if target is focuses
          if ($target.is(":focus")) {
            return false;
          } else {
            // for elements not currently focusable, change tabindex to enable focusing then focus again
            $target.attr('tabindex','-1');
            $target.focus();
          };
        });
      }
    }
  });

  // Updates the total number of items in cart
  const updateTotalNumberInCart = () => {
    // Save each individual item html to a variable
    const $allItemsInCart = $('.currently-in-cart');
    // initialize total number of items in cart
    let sumAllItems = 0;
    // Go over each individual item html, get the number of items they added of that item to cart, and add it to the total number
    $allItemsInCart.each( cart => {
      sumAllItems += +$($allItemsInCart[cart]).val();
    });
    // Update total number of items in cart
    $('.items-in-cart').html(sumAllItems);
    // Update display, will show number of items bubble if going from 0 -> 1, hide bubble if going from 1 -> 0
    displayTotalItemsInCart();
  };

  // Update the number of individual items you add or subtract to cart. inCart is the specific item you are adding or subtracting from. Give plusOrMinus a default value of true so we add by default
  const updateItemInCart = (inCart, plusOrMinus = true) => {
    // Initialize variables to target number of items in cart
    const $itemsInCart = inCart.find('.currently-in-cart');
    // The + changes the value to an int so we can perform arithmatic operations onto the value
    let newItemsInCart = +$itemsInCart.val();
    // Will choose whether we are adding or subtracting from the cart depending on the value we passed onto plusOrMinus
    if (plusOrMinus) {
      newItemsInCart++;
    } else {
      // Make sure we're not subtracting from the individual items cart when it is at zero because that doesn't make sense
      newItemsInCart > 0 ? newItemsInCart-- : newItemsInCart;
    }
    // Update new number of items in the cart
    $itemsInCart.val(newItemsInCart);
    // Update total number of items in the cart
    updateTotalNumberInCart();
  }

  // Will show the amount of items in cart as well as add or subtract buttons when we press "add to cart"
  const showAmountInCart = event => {
    const $amountInCart = $(event.currentTarget).next();
    $amountInCart.slideDown();
  }

  // Add to cart when we click the add button
  $('.increase-incart').on('click', event => {
    // Pass which individual cart we're updating. No value for plusOrMinus becasue the default is true
    updateItemInCart($(event.currentTarget).closest('div'));
  });

  // Subtract from cart when we click minus button
  $('.decrease-incart').on('click', event => {
    // Pass which individual cart we're updating as well as false into plusOrMinus so we subtract in update function
    updateItemInCart($(event.currentTarget).closest('div'), false);
  });

  // Add one item to cart and invoke show amount of items in cart function
  $('.add-to-cart').on('click', event => {
    showAmountInCart(event);
    updateItemInCart($(event.currentTarget).next());
  });

  // Use regex expression to validate if an email is valid, save into function for organization
  const validateEmail = (email) => {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(email);
  };

  // Output a different alert message depending on if the email is valid
  $('#subscribe-email').on('click', event => {
    // Prevent default behavior
    event.preventDefault();
    // Save email field as a variable
    const $inputtedEmail = $(event.currentTarget).siblings().val();
    // Check inputted email against regex expression then output the appropriate alert message
    if (validateEmail($inputtedEmail)) {
      alert('Thanks for subscribing!');
    } else {
      alert('Please enter a valid email address');
    }
  });

  // Flicity plugin
  $('.favourite-products ul').flickity({
    // Make things wrap around to go in a circle, autoplay every 4 seconds, ensure images are loaded to prevent potential bugs
    wrapAround: true,
    autoPlay: 4000,
    imagesLoaded: true
  });

  // Pass Jquery, windows, and documents as parameters to ready function
}(window.jQuery, window, document));