

require( ["plugins/domReady","thirdparty/jquery","notemaker/NoteMaker"], 
		function(domReady, jQuery, NoteMaker, ResourceHandler){
	
	domReady(function(){
		
		require(["thirdparty/jquery", "notemaker/NoteMaker"], 
				function(jQuery, NoteMaker, ResourceHandler, PageEventHandler) {
			
				console.log("things have loaded yo");
				
				var oNoteMaker = new NoteMaker();
				
				/*
				$('.textview').on( 'keyup', 'textarea', function (e){
					console.log("wrking")
				    $(this).css('height', 'auto' );
				    $(this).height( this.scrollHeight );
				});
				*/
			
		});
		
	});

});

