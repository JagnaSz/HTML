window.onload = function()
{
    $("#pole").hide();
    $("#button").mouseenter(function() {
	$(this).fadeTo("fast", 1);
    });
    $("#button").mouseleave(function() {
        $(this).fadeTo("fast", 0.6);
    });
    
    $("#button").click(function() {
	$("#starter").fadeTo("slow",0);
	$("#starter").hide();
	$("#pole").show();
	$("#pole").fadeTo("fast", 1);
    var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d'),
    score = 0,
    level = 0,
    direction = 0,
    snake = new Array(4),
    active = true,
    speed = 450;

    // inicjalizacja tablicy
    var map = new Array(40);
    for (var i = 0; i < map.length; i++) {
        map[i] = new Array(40);
    }

    canvas.width = 404;
    canvas.height = 424;

    var body = document.getElementById('pole');
    body.appendChild(canvas);

    // dodajemy węża
    map = generateSnake(map);

    // dodajemy jedzonko
    map = generateFood(map);

    drawGame();

    window.addEventListener('keydown', function(e) { //dodanie akcji ruchu do tablicy
        if (e.keyCode === 38 && direction !== 3) {
            direction = 2; // Up
        } else if (e.keyCode === 40 && direction !== 2) {
            direction = 3; // Down
        } else if (e.keyCode === 37 && direction !== 0) {
            direction = 1; // Left
        } else if (e.keyCode === 39 && direction !== 1) {
            direction = 0; // Right
        }
    });	

    function drawGame() 
    {
        // czyszczenie tablicy
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // ruch wężaod ostatniego elementu
        for (var i = snake.length - 1; i >= 0; i--) {

            
            if (i === 0) { //głowa
                switch(direction) {
                    case 0: // Right
                        snake[0] = { x: snake[0].x + 1, y: snake[0].y }
                        break;
                    case 1: // Left
                        snake[0] = { x: snake[0].x - 1, y: snake[0].y }
                        break;
                    case 2: // Up
                        snake[0] = { x: snake[0].x, y: snake[0].y - 1 }
                        break;
                    case 3: // Down
                        snake[0] = { x: snake[0].x, y: snake[0].y + 1 }
                        break;
                }

                // gdy spotkanie z tablicą
                if (snake[0].x < 0 || 
                    snake[0].x >= 40 ||
                    snake[0].y < 0 ||
                    snake[0].y >= 40) {
                    showGameOver();
                    return;
                }

                //napotkanie jedzenia, dodanie punktów, generowanie nowego jedzonka
                if (map[snake[0].x][snake[0].y] === 1) {
                    score += 10;
                    map = generateFood(map);

                    // dodanie nowego elementu do węża 
                    snake.push({ x: snake[snake.length - 1].x, y: snake[snake.length - 1].y });
                    map[snake[snake.length - 1].x][snake[snake.length - 1].y] = 2;

                    //level up!
                    if ((score % 100) == 0) {
                        level += 1;
                    }
                
                // gdy wąż napotka siebie ;)
                } else if (map[snake[0].x][snake[0].y] === 2) {
                    showGameOver();
                    return;
                }

                map[snake[0].x][snake[0].y] = 2;
            } else {

                // czyszczenie ostatniego elementu węża po ruchu
                if (i === (snake.length - 1)) {
                    map[snake[i].x][snake[i].y] = null;
                }

                snake[i] = { x: snake[i - 1].x, y: snake[i - 1].y };
                map[snake[i].x][snake[i].y] = 2;
            }
        }

        
        drawMain();

        // wnętrze tablicy
        for (var x = 0; x < map.length; x++) {
            for (var y = 0; y < map[0].length; y++) {
                if (map[x][y] === 1) {
                    ctx.fillStyle = 'black';
                    ctx.fillRect(x * 10, y * 10 + 20, 10, 10);
                } else if (map[x][y] === 2) {
                    ctx.fillStyle = 'green';
                    ctx.fillRect(x * 10, y * 10 + 20, 10, 10); 
		    ctx.strokeStyle = "black";
		    ctx.strokeRect(x * 10, y * 10 + 20, 10, 10);
                }
            }
        }
        
        if (active) {
            setTimeout(drawGame, speed - (level * 50));
        }
    }


    function drawMain() 
    {
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'black'; 

        
        ctx.strokeRect(1, 20, canvas.width - 4, canvas.height - 24);

        ctx.fillStyle = 'black';
        ctx.font = '12px sans-serif';
        ctx.fillText('Score: ' + score + ' - Level: ' + level, 2, 12);
    }

    function generateFood(map)
    {
        //randomowa pozycja
        var rndX = Math.round(Math.random() * 39),
            rndY = Math.round(Math.random() * 39);
        
        //gdy jest tym samym co część węża generuj jeszcze raz
        while (map[rndX][rndY] === 2) {
            rndX = Math.round(Math.random() * 39);
            rndY = Math.round(Math.random() * 39);
        }
        
        map[rndX][rndY] = 1;

        return map;
    }

    function generateSnake(map)
    {
        //randomowa pozycja
        var rndX = Math.round(Math.random() * 39),
            rndY = Math.round(Math.random() * 39);

        // gdy chce ustawić za tablicą
        while ((rndX - snake.length) < 0) {
            rndX = Math.round(Math.random() * 39);
        }
        
        for (var i = 0; i < snake.length; i++) {
            snake[i] = { x: rndX - i, y: rndY };
            map[rndX - i][rndY] = 2;
        }

        return map;
    }

    function showGameOver()
    {
        // dezaktywuje grę
        active = false;

        // czyści tablicę
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = 'black';
        ctx.font = '18px sans-serif';
        
        ctx.fillText('Game Over!', ((canvas.width / 2) - (ctx.measureText('Game Over!').width / 2)), 50);

        ctx.font = '14px sans-serif';

        ctx.fillText('Your Score: ' + score, ((canvas.width / 2) - (ctx.measureText('Your Score: ' + score).width / 2)), 70);
        
    }
    });
};