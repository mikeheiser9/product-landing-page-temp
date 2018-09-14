//pk_test_IOEQTXL1kBrlCn8l0fSG4Z8T
//sk_test_88HBiIjmecJLtvJxacSldSNE

$(document).ready(function() {

    console.log(window.location.pathname)
    // /item/1 
    // use split("/") 
    // array i.e. ["", "item", "1"] , use index to get your item number

    //ajax call
    // array[2]

    //sub. 1 with dynamic itemNumber
    var item = "1";

    $.get(`/api/products/${item}`).then((result)=>{
        console.log("yay", result.product_images);

        let imgArr = result.product_images.split(",");

        console.log(imgArr);

    })


    //cart
    updateCart = (value) => {
        $("#cart-value").text(value);
    }
    
    var reviewAmount = $("#review-amt").text();
    console.log("review amount is: " + reviewAmount);

    $(document).on("mouseenter", '.material-icons', function() {
        $(this).prevAll().andSelf().addClass('hoverSelected');
        $(this).nextAll().removeClass('hoverSelected')
    })

    $(document).on("mouseleave", '.material-icons', function() {
        $(this).prevAll().andSelf().removeClass('hoverSelected');
    })

    $(document).on("click", '.material-icons', function() {
        $('.material-icons').removeClass("clickSelected");
        $(this).prevAll().andSelf().addClass('clickSelected').removeClass('hoverSelected');
        //reviewAmount +1;
    })

    // $('.material-icons').hover(function() {
    //     $(this).prevAll().andSelf().addClass('hoverSelected');
    //     $(this).nextAll().removeClass('hoverSelected')
    // },
    // function() {
    //     $(this).prevAll().andSelf().removeClass('hoverSelected');
    // }
    // ).click(function() {
    //     $('.material-icons').removeClass("hoverSelected");
    //     $(this).prevAll().andSelf().addClass('clickSelected').removeClass('hoverSelected');
    //     //reviewAmount +1;
    // })







});
