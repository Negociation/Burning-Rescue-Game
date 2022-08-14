<?php

?>
<html>
    <head>
        <title>Juice Bar ~ Client</title>
        <style>
            body{
                background-color:black;
            }
            #gameCanvas{
                background-color:white;
            }


        </style>
        <script src="http://localhost/burningrescue/src/core.js"></script>
        <script src="http://localhost/burningrescue/src/client.js"></script>
    </head>  
    <body>
        <div id="gameTitle"></div>
        <div id="gameCanvas">
            <script>
                var clientConfig = {
                    type: Phaser.AUTO,
                    backgroundColor: '#000',
                    scene: Client,
                    scale: {
                        mode: Phaser.Scale.RESIZE,
                        parent: 'gameCanvas',
                        width: '100%',
                        height: '100%'
                    }
                }; 

                //Game Instance
                var gameInstance = new Phaser.Game(clientConfig);
            </script>
        </div>
    </body>
</html>