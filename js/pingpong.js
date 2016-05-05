(function($) {

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
            height: parseInt($("#playground").height()),
            width: parseInt($("#playground").width()),
        },
        ball: {
            speed: 5, // Speed defines how many pixels the ball moves in each step
            x: 150,
            y: 100,
            redius: 20,
            directionX: 1,
            directionY: 1
        }
        //  When the directionX/Y value is 1, the ball moves to the positive direction of the axis. When the direction is -1, the ball moves to the negative direction. By toggling the x and y directions, we can move the ball in four directions.
    };

    // Ball collision logic
    function ballHitsTopBottom() {
        var y = pingpong.ball.y + pingpong.ball.speed * pingpong.ball.directionY;
        return y < 0 || y > pingpong.playground.height;
    }

    function ballHitsRightWall() {
        return pingpong.ball.x + pingpong.ball.speed * pingpong.ball.directionX > pingpong.playground.width;
    }

    function ballHitsLeftWall() {
        return pingpong.ball.x + pingpong.ball.speed * pingpong.ball.directionX < 0;
    }

        // Ball movement logic
    function moveBall() {
        // reference useful variables
        var ball = pingpong.ball;

        // check playgroudn top/bottom boundary
        if (ballHitsTopBottom()) {
            ball.directionY *= -1;
        }

        // check right boundary
        if (ballHitsRightWall()) {
            playerAWin();
        }

        // check left boundary
        if (ballHitsLeftWall()) {
            playerBWin();
        }

        // check paddles here

        // update the ball position data. This will effectively, move the ball 5 pixel at a time.
        ball.x += ball.speed * ball.directionX;
        ball.y += ball.speed * ball.directionY;
    }

    // Winning logic
    function playerAWin() {
        pingpong.ball.x = 250;
        pingpong.ball.y = 100;

        // Update the ball location variable
        pingpong.ball.directionX = -1;
    }

    function playerBWin() {
        pingpong.ball.x = 150;
        pingpong.ball.y = 100;

        // Update the ball location variable
        pingpong.ball.directionX = 1;
    }

    // view rendering
    function renderPaddles() {
        $("#paddleB").css("top", pingpong.paddleB.y);
        $("#paddleA").css("top", pingpong.paddleA.y);
    }

    // After ball's movement is calculated, we want to render the view to update the ball's position based on the data.
    function renderBall() {
    var ball = pingpong.ball;
    $("#ball").css({
      "left" : ball.x + ball.speed * ball.directionX,
      "top" : ball.y + ball.speed * ball.directionY
    });
  }


    // view inputs
    function handleMouseInputs() {
    // run the game when mouse moves in the playground.
    $('#playground').mouseenter(function(){
      pingpong.isPaused = false;
    });

    // pause the game when mouse moves out the playground.
    $('#playground').mouseleave(function(){
      pingpong.isPaused = true;
    });

    // calculate the paddle position by using the mouse position.
    $('#playground').mousemove(function(e){
      pingpong.paddleB.y = e.pageY - pingpong.playground.offsetTop;
    });
  }

    // Browser render loop
    function render() {
        renderBall();
        renderPaddles();
        window.requestAnimationFrame(render);
    }

    // Define a gameloop function to move the ball on each game loop iteration.
    function gameloop() {
        moveBall();
    }

    // starting point of entire game
    function init() {
        // Set interval to call gameloop logic in 30 FPS so that the ball moves every 33.3 milliseconds.
        pingpong.timer = setInterval(gameloop, 1000/30);

        // view rendering
        window.requestAnimationFrame(render);

        // inputs
        handleMouseInputs();
    }

    // Execute the starting point
    init();

})(jQuery);