$('.offer_action').magnificPopup({
  type:'inline',
  midClick: true // Allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source in href.
});

var waypoints = $('.content').waypoint(function(direction) {

  		if (direction === "down") 
		    $(".navbar").addClass("navbar-fixed-top animated fadeInDownBig");
		    
  		if (direction === "up") 
		    $(".navbar").removeClass("navbar-fixed-top animated fadeInDownBig");
		    
  } , {
	offset: "50%",
})

