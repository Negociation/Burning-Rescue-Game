/*
Burning Rescue Quiz Client Engine
Author: Thiago Araújo

*/

class MatchScene extends Phaser.Scene{
    constructor(){
        super("matchScene");
    }

    create(){
        alert("Nova Partida Rolando");
    }

    update(){

    }
}


class MenuPrincipal extends Phaser.Scene{
    constructor(){
        super("menuPrincipal");
    }

    create(){
        alert("Menu Principal Aqui Estou");
    }

    update(){

    }
}

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
        this.loadContainer.setPosition(gameSize.width / 2, gameSize.height / 2);
    }

    create(){
        this.scene.add('menuPrincipal', new MenuPrincipal());
        this.scene.start('menuPrincipal');
    }
    

}