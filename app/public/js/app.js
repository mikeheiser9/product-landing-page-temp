//pk_test_IOEQTXL1kBrlCn8l0fSG4Z8T
//sk_test_88HBiIjmecJLtvJxacSldSNE

$(document).ready(function() {
    
    var reviewAmount = $("#review-amt").text();
    console.log("review amount is: " + reviewAmount);

    $('.material-icons').hover(function() {
        $(this).prevAll().andSelf().addClass('hoverSelected');
        $(this).nextAll().removeClass('hoverSelected')
    },
    function() {
        $(this).prevAll().andSelf().removeClass('hoverSelected');
    }
).click(function() {
    $('.material-icons').removeClass("hoverSelected");
    $(this).prevAll().andSelf().addClass('clickSelected').removeClass('hoverSelected');
    //reviewAmount +1;
})


//cart
var orderQnt = $("#quantity-input").val();
console.log(orderQnt);
var cartVal = $("#cart-value").text();
console.log(cartVal);


});
