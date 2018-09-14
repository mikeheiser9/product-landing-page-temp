$( document ).ready(function() {
  console.log( "stripe ready!" );

const stripe = Stripe("pk_live_fA9g8eTjdCXwBdl9cRzc4tP6");
const elements = stripe.elements();
const style = {
  base: {
    color: "white",
    lineHeight: "18px",
    fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
    fontSmoothing: "antialiased",
    fontSize: "16px",
    "::placeholder": {
      color: "#aab7c4"
    }
  },
  invalid: {
    color: "#fa755a",
    iconColor: "#fa755a"
  }
};
const card = elements.create("card", { style: style });
card.mount("#card-element");

card.addEventListener("change", function(event) {
  const displayError = document.getElementById("card-errors");
  if (event.error) {
    displayError.textContent = event.error.message;
  } else {
    displayError.textContent = "";
  }
});


function stripeTokenHandler(token) {
    var form = document.getElementById("payment-form");
    var hiddenInput = document.createElement("input");
    hiddenInput.setAttribute("type", "hidden");
    hiddenInput.setAttribute("name", "stripeToken");
    hiddenInput.setAttribute("value", token.id);
  
    var totalAmount = document.createElement("input");
    totalAmount.setAttribute("type", "hidden");
    totalAmount.setAttribute("name", "totalAmount");
    totalAmount.setAttribute("value", calculateTotalCost(item_ids_in_cart));
    form.appendChild(hiddenInput);
    form.appendChild(totalAmount);
  
    var formData = JSON.stringify({
      stripeToken: token.id,
      totalAmount: totalAmount.value
    });
  
    $.ajax({
      type: "POST",
      url: "/charge",
      data: formData,
      success: function() {
        $.post().then(order => {
          localStorage.removeItem("itemIds");
          spinner.style.opacity = "0";
          window.location.href = "/complete";
        });
      },
      error: function(xhr, textStatus, error) {
        spinner.style.opacity = "0";
        alert(
          "something went wrong with your payment, please check your card information"
        );
      },
      dataType: "json",
      contentType: "application/json"
    });
    // form.submit();
  }


  var paymentRequest = stripe.paymentRequest({
    country: "US",
    currency: "usd",
    total: {
      amount: 1099,
      label: "Total"
    },
    requestShipping: true,
    shippingOptions: [
      {
        id: "free-shipping",
        label: "Free shipping",
        detail: "Arrives in 5 to 7 days",
        amount: 0
      },
    //   {
    //     id: "usps",
    //     label: "US Postal Service",
    //     detail: "Arrives in 7 to 10 days",
    //     amount: 5
    //   },
    ]
  });
  paymentRequest.on("token", function(result) {
    var example = document.querySelector(".example5");
    example.querySelector(".token").innerText = result.token.id;
    example.classList.add("submitted");
    result.complete("success");
  });

  var paymentRequestElement = elements.create("paymentRequestButton", {
    paymentRequest: paymentRequest,
    style: {
      paymentRequestButton: {
        theme: "light"
      }
    }
  });

  paymentRequest.canMakePayment().then(function(result) {
    if (result) {
      document.querySelector(".example5 .card-only").style.display = "none";
      document.querySelector(
        ".example5 .payment-request-available"
      ).style.display =
        "block";
      paymentRequestElement.mount("#example5-paymentRequest");
    }
  });

})