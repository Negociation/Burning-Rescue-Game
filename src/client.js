/*
Burning Rescue Quiz Client Engine
Author: Thiago Araújo

*/

//Classe de Jogo
class BurningGame extends Phaser.Game{
    
    constructor(gameConfig){
        super(gameConfig);
        this.initializeGame();
        

    }

    initializeGame(){
        this.quizDirectory = null;
        this.quizDirectoryStatus = 0;
        this.gameCurrentScene = "loading";
        this.externalDirectoryUrl = null;

        this.loadDirectoryData();
    }

    loadDirectoryData(){

        if(this.externalDirectoryUrl != null){
            //Carregamento Externo
        }else{
            let defaultDirectoryData = 
            '{ "questions" : [' +
                '{"questao":"Pergunta A","opts":["Talvez A","Talvez B","Talvez C","Talvez D"],"resposta":1},'+
                '{"questao":"Pergunta B","opts":["Talvez A","Talvez B","Talvez C","Talvez D"],"resposta":1},'+
                '{"questao":"Pergunta C","opts":["Talvez A","Talvez B","Talvez C","Talvez D"],"resposta":1},'+
                '{"questao":"Pergunta D","opts":["Talvez A","Talvez B","Talvez C","Talvez D"],"resposta":1}]}';
            
            
            this.quizDirectory = JSON.parse(defaultDirectoryData);
            console.log(this.quizDirectory);
            this.quizDirectoryStatus = 1;


        }
    }
    
}


//Tela de Partida
class Partida extends Phaser.Scene{

    constructor(){
        super("partida");

        //Construtor (Propriedades)
        this.gameStatus = -1;
        this.gameCounter = -1;
        this.gameRound = 0;
        this.lifeSpan = 4;
        this.rightAnswers = 0;
        this.score = 0;
        this.questionHistory = [];
    }

    create(){
        //Inicializar Placeholders de Texto
        this.text = this.add.text(32, 32);
        this.text2 = this.add.text(32, 60);
        this.tituloPergunta = this.add.text(32,200);
        this.respostasPerguntas = [];
        this.respostasPerguntas = [this.add.text(32,230).setInteractive(),this.add.text(32,250).setInteractive(),this.add.text(260,230).setInteractive(),this.add.text(260,250).setInteractive()];

        /* Eventos de Intercepção de Mouse para as Respostas */
        this.respostasPerguntas[0].on('pointerdown', function (pointer) {
            this.responderPergunta(1);
            console.log("Clicado 1");
        }.bind(this));

        this.respostasPerguntas[1].on('pointerdown', function (pointer) {
            console.log("Clicado 2");
            this.responderPergunta(2);
        }.bind(this));

        this.respostasPerguntas[2].on('pointerdown', function (pointer) {
            console.log("Clicado 3");
            this.responderPergunta(3);
        }.bind(this));

        this.respostasPerguntas[3].on('pointerdown', function (pointer) {
            console.log("Clicado 4");
            this.responderPergunta(4);
        }.bind(this));

        //Eventos de Interceptação de Teclado para Respostas
        this.input.keyboard.on('keydown', function (event) {
                switch(event.key){
                    case "a":
                        case "A":
                            this.responderPergunta(1);
                            console.log("pickei a");
                            break;
                    case "b":
                        case "B":
                            this.responderPergunta(2);
                            console.log("pickei b");
                            break;
                    case "c":
                        case "C":
                            this.responderPergunta(3);
                            console.log("pickei c");
                            break;
                    case "d":
                        case "D":
                            this.responderPergunta(4);
                            console.log("pickei d");
                            break;
                }
            
        }.bind(this));
    }

    update(){
        //Atualizar a Label com as Vidas Restantes
        this.text2.setText('Vidas Restantes: ' + this.lifeSpan);

        //Escolher estado do jogo para as devidas atualizações
        switch(this.gameStatus){
            //Nova Partida (Primeira Vez)
            case -1:
                alert("Oops, um incêndio começou e os bombas d'agua estão travadas, podendo serem apenas destravadas com a resposta correta, responda as perguntas e ajude-nos a salvar os residentes deste predio em chamas");
                this.gameStatus = 0;
                break;
            //Novo Round de Perguntas
            case 0:
                if(this.rightAnswers < 4){
                    this.novaPergunta();
                }else{
                    alert("Parabens, você conseguiu apagar o incêndio, seu score foi:"+ this.score );
                    this.scene.remove("partida");
                    this.scene.start('menuPrincipal');
                }
                break;
            //Round Rodando
            case 1:
                console.log("Aguardando o tempo de resposta");
                if(this.gameCounter==-1){
                    this.lifeSpan -=1;
                    this.timedEvent.paused = true;
                    alert("Tempo Acabou, o fogo esta se alastrando, não desista");
                    this.text.setText("");
                    this.gameStatus= 0;
                }
                if(this.lifeSpan == 0){
                    alert("Meu deus parece que não conseguimos salvar os cidadãos, é uma pena,contudo você pode tentar novamente. Seu score foi: "+ (this.score > 0 ? this.score : 0));
                    this.scene.remove("partida");
                    this.scene.start('menuPrincipal');
                    
                }
                break;
        }




    }

    onEvent(){
        console.log("Executei Evento");
        //Subtrair 1s do contador
        this.gameCounter -= 1;

        //Atualizar o Texto da Tela
        this.text.setText('Tempo para Responder: ' + this.gameCounter);
    }

    novaPergunta(){
        //Se ja existe um timer definido remover para proxima pergunta
        if(this.timedEvent == undefined){
            this.timedEvent = this.time.addEvent({ delay: 1000, callback: this.onEvent, callbackScope: this, loop: true });
        }

        

        
        //Preparar para a rodada de perguntas
        this.gameCounter = 20;
        //this.timedEvent = this.time.delayedCall(1000, this.onEvent, [], this,true);

        //Setar o Round
        this.gameRound += 1;

        //Adicionar o Evento de Cronometro
        
        //Começar a rodar a partida novamente
        this.gameStatus = 1;

        //Locales de Pergunta e Resposta
        this.text.setText('Tempo para Responder: ' + this.gameCounter);

        //Escolher pergunta do diretorio:
        let randomQuestion =Math.floor(Math.random() * (0 - (this.game.quizDirectory.questions.length)) + (this.game.quizDirectory.questions.length));
        if(this.questionHistory.length < this.game.quizDirectory.questions.length){
            while(this.questionHistory.includes(randomQuestion)){
                randomQuestion =Math.floor(Math.random() * (0 - (this.game.quizDirectory.questions.length)) + (this.game.quizDirectory.questions.length));
            }
        }else if(this.questionHistory.length == this.game.quizDirectory.questions.length){
            //A partir deste ponto pode-se repetir perguntas
            alert("Gee, Dejavi! Falha na matrix, Você esgotou nosso estoque de perguntas.");
            randomQuestion =Math.floor(Math.random() * (0 - (this.game.quizDirectory.questions.length)) + (this.game.quizDirectory.questions.length));
        }else{
            randomQuestion =Math.floor(Math.random() * (0 - (this.game.quizDirectory.questions.length)) + (this.game.quizDirectory.questions.length));
        }

        this.questionHistory.push(randomQuestion);

        //Setar o texto com base na pergunta escolhida
        this.tituloPergunta.setText("Pergunta "+ this.gameRound +": " + this.game.quizDirectory.questions[randomQuestion].questao);
        this.respostasPerguntas[0].setText("A) " +this.game.quizDirectory.questions[randomQuestion].opts[0]);
        this.respostasPerguntas[1].setText("B) " +this.game.quizDirectory.questions[randomQuestion].opts[1]);
        this.respostasPerguntas[2].setText("C) " +this.game.quizDirectory.questions[randomQuestion].opts[2]);
        this.respostasPerguntas[3].setText("D) " +this.game.quizDirectory.questions[randomQuestion].opts[3]);

        this.timedEvent.paused = false;
    }

    responderPergunta(resposta){
        //Se o jogo esta rolando então pode validar as respostas
        if(this.gameStatus==1){
            console.log(this.game.quizDirectory.questions[this.questionHistory[this.questionHistory.length-1]].resposta);
            if(this.game.quizDirectory.questions[this.questionHistory[this.questionHistory.length-1]].resposta == resposta){
                this.rightAnswers += 1;
                this.gameStatus = 0;
                this.score += this.gameCounter + 10;
            }else{
                //Pessoa Errou então 
                this.score -= 10;
                this.lifeSpan -=1;
                this.gameStatus = (this.lifeSpan > 0 ? 0 : 1);
            }
        }
    }


}

//Tela de Menu Principal
class MenuPrincipal extends Phaser.Scene{
    constructor(){
        super("menuPrincipal");
    }

    create(){

        //Declaração de Objetos do Menu
        this.menuContainer = this.add.container(this.scale.width / 2, this.scale.height / 2);
        this.startButton = this.add.sprite(0,0, 'startbutton').setInteractive();
        this.gameLogo = this.add.sprite(0,-120, 'game_logo').setInteractive();
        this.startButton.setVisible(false);
        this.startButton.alpha =0;
        this.startButton.setScale(0.5,0.5);
        //Adicionar Logo e Botao no container para mover tudo junto 
        this.menuContainer.add(this.startButton);
        this.menuContainer.add(this.gameLogo);


        /* Eventos de Mouse para Botão de Play */
        this.startButton.on('pointerdown', function (pointer) {
            this.scene.add('partida', new Partida());
            this.scene.start('partida');
        }.bind(this));

        this.startButton.on('pointerover', function (pointer) {
            this.setTint(0xE6810E);
        });

        this.startButton.on('pointerout', function (pointer) {
            this.clearTint();    
        });

        this.startButton.on('pointerup', function (pointer) {
            this.clearTint();    
        });


        this.tweens.add({
            targets: this.gameLogo,
            props: {
                y: { value: '-=30', duration: 1000, ease: 'Bounce.easeIn', yoyo: true,delay:2000,repeatDelay:1000,  repeat:-1 }
            },
            onRepeat: function () {
                this.startButton.setVisible(true);          
                this.tweens.add({
                    targets: this.startButton,
                    alpha: {
                        value: 1, duration: 2000, ease: 'Power1' }        
                });
            }.bind(this)
        });

        
        this.scale.on('resize',  this.resize,this);

    }

    update(){

    }


    resize(gameSize, baseSize, displaySize, resolution){
        this.menuContainer.setPosition(gameSize.width / 2, gameSize.height / 2);
        
    }
}

//Tela de Carregamento
class Client extends Phaser.Scene{

    constructor(){
        super("Client");
        this.loadContainer = null;
        this.loadIcon = new Array();
        this.loadProgress = 0;

    }

    preload(){
        //Disable Input
        this.input.mouse.disableContextMenu();

        //Basepath
        this.load.setBaseURL('http://localhost/burningrescue/src/');
    
        //Load Game Logo Async
        this.textures.addBase64("gameLogo", "data:image/png;base64,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");
        this.textures.once('addtexture', this.initializeScene,this);
        
        //Dynamic Load Begins of Images from Menu and Match
        this.load.image("teste","assets/logo.png");
        this.load.image("teste2","assets/logo.png");
        this.load.image("startbutton","assets/startbutton.png");
        this.load.image("game_logo","assets/game_logo.png");


    }
    
    initializeScene (textureName) {
        if(textureName == "gameLogo"){
            this.loadContainer = this.add.container(this.scale.width / 2,this.scale.height / 2);

            //Loader Icon
            this.loadIcon.push(this.add.graphics({fillStyle : {color:"0x56a700", alpha: 1},lineStyle:{alpha: 0}}));
            this.loadIcon.push(this.add.image(0,0, 'gameLogo'));

            //Loader Container
            this.loadContainer.add(this.loadIcon);
            this.loadContainer.setScale(0.25,0.25);

            //Event Listners for Load Events
            this.load.on('progress',this.setUpdateProgress,this);
            this.load.on('complete',this.setCompleteProgress,this);
            this.scale.on('resize',  this.resize,this);
        }

    }

    setUpdateProgress(loadProgress){
        this.loadProgress = loadProgress * 100;
        this.loadIcon[0].fillRect(-this.loadIcon[1].width/2,(this.loadIcon[1].height/2)-(this.loadIcon[1].height*(loadProgress)), (this.loadIcon[1].width*1) ,(this.loadIcon[1].height*loadProgress*(loadProgress)));       
    }



    setCompleteProgress(){
        if(this.loadProgress < 100){
            alert("ERROR: Some error happened please try again.");
        }
    }

    resize(gameSize, baseSize, displaySize, resolution){
        this.loadContainer.setPosition(gameSize.width, gameSize.height);
    }

    create(){
        this.scene.add('menuPrincipal', new MenuPrincipal());
        this.scene.start('menuPrincipal');
    }
    
}