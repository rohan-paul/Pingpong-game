(function($){

	// Writing function to update the DOM elements of the paddles based on the position data.
	var pingpong = {
		paddleA: {
			x: 50,
			y: 100,
			width: 20,
			height: 70
		},
		paddleB: {
			x: 320,
			y: 100,
			width: 20,
			height: 70
		},
		playground: {
			offsetTop: $("#playground").offset().top,
		},
	};

	// view rendering
	function renderPaddles() {
		$("#paddleB").css("top", pingpong.paddleB.y);
		$("#paddleA").css("top", pingpong.paddleA.y);
	}

	// view inputs
	function handleMouseInputs() {
		// run the game when mouse moves in the playground.
		$('#playground').mouseenter(function() {
			pingpong.isPaused = false;
		});

		// Pause the game when mouse moves out of the playground
		$('#playground').mouseleave(function() {
			pingpong.isPaused = true;
		});

		/*caclulate the paddle position by using the mouse position.
		The paddleB should be in sync with the mouse cursor position and move along with the mouse. Hence paddleB's position formulae is -

		At any moment top coordinates of paddleB relative to the top edge of "playgound" = ( mouse cursor's top coordinate relative to the top edge of the whole document )  -  ( top coordinate of the "playground" relative the top edge of the whole document )
		*/

		$('#playground').mousemove(function(e) {
			pingpong.paddleB.y = e.pageY - pingpong.playground.offsetTop;
		});
	}

	// Browser render loop
	function render() {
		renderPaddles();
		window.requestAnimationFrame(render);
	}

	// starting point of entire game
	function init() {
		// view rendering
		window.requestAnimationFrame(render);

		// inputs
		handleMouseInputs();
	}

	// Execute the starting point
	init();

})(jQuery);