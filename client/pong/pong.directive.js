angular.module('ppc').directive('pong', pong);

function pong($window) {
    return {
        restrict: 'AE',
        link: function(scope, element, attrs) {
            var field = $(element);
            var fieldHeight = $(element).height();
            var fieldWidth = field.parent().width();
            var playerWidth = 40;
            var playerHeight = 10;

            var ballWidth = 10;
            var ballHeight = 10;

            var player = field.find('#player');
            var ball = field.find('#ball');
            var score = field.find('#score');

            var points = 0;

            score.css('left', 10 + 'px');
            score.css('bottom', fieldHeight - 30 + 'px');

            function updateScore() {
                score.text(""+points);
                ballSpeed = 0.3 + (0.05 * (points / 3));
            }
            updateScore();

            

            field.hide();
            function showElement() {
                field.show();
            }

            var playerLeft = fieldWidth / 2;
            var playerSpeed = 0.2;
            var ballSpeed = 0.3;
            var ballGoingRight = false;
            var ballGoingUp = true;
            var ballLeft = playerLeft;
            var ballBottom = playerHeight * 2;

            player.css('left', playerLeft + 'px');
            player.css('bottom', 0 + 'px');
            player.css('height', playerHeight + 'px');
            player.css('width', playerWidth + 'px');
            player.css('margin-left', -playerWidth / 2);
            player.css('margin-bottom', -playerHeight / 2);

            ball.css('left', ballLeft + 'px');
            ball.css('bottom', ballBottom + 'px');
            ball.css('height', ballHeight + 'px');
            ball.css('width', ballWidth + 'px');
            ball.css('margin-left', -ballWidth / 2);
            ball.css('margin-bottom', -ballHeight / 2);

            var lastUpdate = Date.now();

            $window.requestAnimationFrame(gameLoop);

            var input = {
                left: false,
                right: false
            };

            $window.onkeydown = function(event) {
                switch(event.keyCode) {
                    case 37:
                        input.left = true;
                        event.preventDefault();
                        break;
                    case 39:
                        input.right = true;
                        event.preventDefault();
                        break;
                    case 45:
                        showElement();
                        break;
                }
            };

            $window.onkeyup = function(event) {
                switch(event.keyCode) {
                    case 37:
                        input.left = false;
                        event.preventDefault();
                        break;
                    case 39:
                        input.right = false;
                        event.preventDefault();
                        break;
                }
            };

            function gameLoop() {
                var timeDelta = Date.now() - lastUpdate;
                lastUpdate = Date.now();

                if (input.left) {
                    playerLeft -= timeDelta * playerSpeed;
                }
                if (input.right) {
                    playerLeft += timeDelta * playerSpeed;
                }

                playerLeft = Math.max(playerWidth, playerLeft);
                playerLeft = Math.min(fieldWidth - playerWidth, playerLeft);

                player.css('left', playerLeft + 'px');

                if (ballGoingUp) {
                    ballBottom += timeDelta * ballSpeed;
                } else {
                    ballBottom -= timeDelta * ballSpeed;
                }

                if (ballGoingRight) {
                    ballLeft += timeDelta * ballSpeed;
                } else {
                    ballLeft -= timeDelta * ballSpeed;
                }

                if (ballLeft - ballWidth / 2 < 0) {
                    ballGoingRight = true;
                }
                if (ballLeft + ballWidth / 2 > fieldWidth) {
                    ballGoingRight = false;
                }
                if (ballBottom + ballHeight / 2 > fieldHeight) {
                    ballGoingUp = false;
                }
                if (ballBottom - ballHeight / 2 < -playerHeight * 2) {
                    // TODO Reset tai game end
                    ballGoingUp = true;
                    points = 0;
                    updateScore();
                }

                //console.log(playerLeft - playerWidth / 2 > ballLeft + ballWidth / 2);
                if (!(playerLeft - playerWidth / 2 > ballLeft + ballWidth / 2 ||
                playerHeight / 2 < ballBottom - ballHeight / 2 ||
                playerLeft + playerWidth / 2  < ballLeft - ballWidth ||
                    -playerHeight / 2 > ballBottom + ballHeight / 2)) {
                    ballGoingUp = true;
                    points++;
                    updateScore();
                }

                ball.css('left', ballLeft + 'px');
                ball.css('bottom', ballBottom + 'px');


                $window.requestAnimationFrame(gameLoop);
            }
        }
    };
}