//open and close toggle-navbat for small screen
$('.navbar-toggle').click('click', function(e) {
    $('.navbar-collapse').css("background-color","lightgray").toggle() //
    $('.navbar-collapse ul li a').click(function(){ 
             $('.navbar-toggle:visible').click(); //hide the collapse when a section is chosen
     });
});
//smooth scroll
$('a.page-scroll').click('click', function(e) {
    var $anchor = $(this);
         $('html, body').stop().animate({
             scrollTop: ($($anchor.attr('href')).offset().top+3) //where the animation takes you, how long it takes and what type of animation it is
         }, 1250, 'easeInOutExpo');
         event.preventDefault();
})

var aChildren = $(".navbar-right li").children(); // find the a children of the list items
var css = 'table td:hover{ background-color: #00ff00 }'; //to get the hover effect back
 $(window).scroll(function(){
    var windowPos = $(window).scrollTop(); // get the offset of the window from the top of page
    var windowHeight = $(window).height(); // get the height of the window
    for (var i=0; i < aChildren.length; i++) {
        var Child = aChildren[i]            //get the specific child
        var ID= Child.href.split('#')[1];   //get the id for that child's href
        var divPos = $('#'+ID).offset().top; // get the offset of the div from the top of page
        var divHeight = $('#'+ID).height() + 150; // get the height of the div in question
        if (windowPos >= divPos && windowPos < (divPos + divHeight)) {
            $("a[href='#" + ID + "']").css("color","#fed138"); //change the color when in the area
        } else {
            $("a[href='#" + ID + "']").css("color","black")
            $("a[href='#" + ID + "']").mouseenter(function(){
                $(this).css("color","#fed138");
            })
            $("a[href='#" + ID + "']").mouseleave(function(){
                $(this).css("color","black");
            })
        }
    }
});
