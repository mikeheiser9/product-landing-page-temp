var stripe = Stripe('pk_test_IOEQTXL1kBrlCn8l0fSG4Z8T');

var paymentRequest = stripe.paymentRequest({
    country: 'US',
    currency: 'usd',
    total: {
      label: 'Demo total',
      amount: 1099,
    },
    requestPayerName: true,
    requestPayerEmail: true,
    requestPayerPhone: true
  });

var elements = stripe.elements();
var prButton = elements.create('paymentRequestButton', {
  paymentRequest: paymentRequest,
});

// Check the availability of the Payment Request API first.
paymentRequest.canMakePayment().then(function(result) {
  if (result) {
    prButton.mount('#payment-request-button');
  } else {
    document.getElementById('payment-request-button').style.display = 'none';
  }
});

paymentRequest.on('token', function(ev) {
    // Send the token to your server to charge it!
    fetch('/charges', {
      method: 'POST',
      body: JSON.stringify({token: ev.token.id}),
      headers: {'content-type': 'application/json'},
    })
    .then(function(response) {
      if (response.ok) {
        // Report to the browser that the payment was successful, prompting
        // it to close the browser payment interface.
        ev.complete('success');
      } else {
        // Report to the browser that the payment failed, prompting it to
        // re-show the payment interface, or show an error message and close
        // the payment interface.
        ev.complete('fail');
      }
    });
  });

  var paymentRequest = stripe.paymentRequest({
    country: 'US',
    currency: 'usd',
    total: {
      label: 'Demo total',
      amount: 1099,
    },
  
    requestShipping: true,
    // `shippingOptions` is optional at this point:
    shippingOptions: [
      // The first shipping option in this list appears as the default
      // option in the browser payment interface.
      {
        id: 'free-shipping',
        label: 'Free shipping',
        detail: 'Arrives in 5 to 7 days',
        amount: 0,
      },
    ],
  });

  paymentRequest.on('shippingaddresschange', function(ev) {
    if (ev.shippingAddress.country !== 'US') {
      ev.updateWith({status: 'invalid_shipping_address'});
    } else {
      // Perform server-side request to fetch shipping options
      fetch('/calculateShipping', {
        data: JSON.stringify({
          shippingAddress: ev.shippingAddress
        })
      }).then(function(response) {
        return response.json();
      }).then(function(result) {
        ev.updateWith({
          status: 'success',
          shippingOptions: result.supportedShippingOptions,
        });
      });
    }
  });

  elements.create('paymentRequestButton', {
    paymentRequest: paymentRequest,
    style: {
      paymentRequestButton: {
        type: 'buy', // default: 'default'
        theme: 'dark', // default: 'dark'
        height: '64px', // default: '40px', the width is always '100%'
      },
    },
  });