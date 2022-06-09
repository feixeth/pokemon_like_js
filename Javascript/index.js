                    /* Reproduction d'un pokemon-like miniature en HTML/JS*/

                    /* Recuperation du canvas HTML et son contexte */

const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

                    /*Resize du canvas - faisable en CSS aussi */

canvas.width = 1024;
canvas.height = 576;



const collisionsMap = []
    for(let i=0;i<collisions.length;i += 70) {
        collisionsMap.push(collisions.slice(i, 70 + i))
}               

const boundaries = []

const offset = {
    x:-1075,
    y:-1577
}

collisionsMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if(symbol === 1285)
        boundaries.push(new Boundary({
                        position: {
                            x:j * Boundary.width + offset.x,
                            y:i * Boundary.height + offset.y
                        }
        }))
    })
})


                    /* Def des attribut du contexte - taille du rectangle et couleur de fond */

context.fillStyle = 'white';
context.fillRect(0, 0, canvas.width, canvas.height);

                                /*CREATION DE LA MAP*/
/* Je crée une const image (donc format html) pour sourcer le png, PUIS je draw l'image HTML dans le CANVAS */

const image = new Image();
image.src="./Map_Assets/map tile 12x12/vanillaMap.png";

                                /*CREATION DU FOREGROUND - Permet de passer derriere les objets*/

const foregroundImage = new Image();
foregroundImage.src='./Map_Assets/foregroundObjects/foregroundObject.png'

                                        /*CREATION DU CHARACTER*/
                            /*Import de chaque sprite pour chaque face*/

const playerDownImage = new Image();
playerDownImage.src='./Map_Assets/char/playerDown.png';

const playerUpImage = new Image();
playerUpImage.src='./Map_Assets/char/playerUp.png';

const playerLeftImage = new Image();
playerLeftImage.src='./Map_Assets/char/playerLeft.png';

const playerRightImage = new Image();
playerRightImage.src='./Map_Assets/char/playerRight.png';

                            /*Creation sprite du joueur*/

const player  = new Sprite ({
    position : {
        x: canvas.width / 2 - 192 / 4 / 2, 
        y: canvas.height / 2 - 68 / 2
    },
    image: playerDownImage,
    frames: { 
        max: 4
    },
    sprites: {
        up:playerUpImage,
        left:playerLeftImage,
        right:playerRightImage,
        down:playerDownImage
    }
})

                            /*Creation sprite de la map*/

const background = new Sprite({
    position: {
        x: offset.x,
        y: offset.y
    },
    image: image
})

                            /*Creation sprite des foreground object*/

const foreground = new Sprite({
    position: {
        x: offset.x,
        y: offset.y
    },
    image: foregroundImage
})

            /* Creation de la const Key pour renseigner quelle touche doivent etre ecouté */

const keys = {
        z :{
            pressed : false
        },
        s :{
            pressed : false
        },
        q :{
            pressed : false
        },
        d :{
            pressed : false
        },
}

                            /*Creation constante movable qui inclus les element qui bouge lors des deplacements*/

const movables = [background, ...boundaries,foreground]

            /*Function pour la collision */
function rectangularCollision ({rectangle1, rectangle2}) {
    return (rectangle1.position.x + rectangle1.width >= rectangle2.position.x &&
        rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
        rectangle1.position.y <= rectangle2.position.y + rectangle2.height &&
        rectangle1.position.y + rectangle1.height >= rectangle2.position.y)
}
            /*Function animate comme un setInterval, crée une boucle sur la function qui affiche les images*/
    function animate() {
        window.requestAnimationFrame(animate)
        background.draw()
       boundaries.forEach((boundary) => {
            boundary.draw()
    })
        player.draw()
        foreground.draw()
        let moving = true

        /* DECLARATION DES MOUVEMENTS & COLLISION QUAND TOUCHE PRESSEE */

        player.moving = false
        if(keys.z.pressed && lastKey === 'z') { 
            player.moving = true
            player.image = player.sprites.up
            for(let i=0;i<boundaries.length;i++) {
                const boundary = boundaries[i]
                if(
                    rectangularCollision({
                      rectangle1: player,
                      rectangle2: {...boundary,position: {
                          x:boundary.position.x,
                          y: boundary.position.y + 3
                      }}
                   })
              )   {
                   moving = false
                   break
          }
            }
            if(moving)
                movables.forEach ((movable) => {
                    movable.position.y += 3
                })
        }
        else if (keys.q.pressed && lastKey === 'q') {
            player.moving = true
            player.image = player.sprites.left
            for(let i=0;i<boundaries.length;i++) {
                const boundary = boundaries[i]
                if(
                    rectangularCollision({
                      rectangle1: player,
                      rectangle2: {...boundary,position: {
                          x:boundary.position.x + 3,
                          y: boundary.position.y
                      }}
                   })
              )   { console.log('holala')
                   moving = false
                   break
          }
            }
            if(moving)
            movables.forEach ((movable) => {
                movable.position.x += 3
            })
        }
        else if (keys.s.pressed && lastKey === 's') {
            player.moving = true
            player.image = player.sprites.down
            for(let i=0;i<boundaries.length;i++) {
                const boundary = boundaries[i]
                if(
                    rectangularCollision({
                      rectangle1: player,
                      rectangle2: {...boundary,position: {
                          x:boundary.position.x,
                          y: boundary.position.y - 3
                      }}
                   })
              )   { console.log('holala')
                   moving = false
                   break
          }
            }
            if(moving)
            movables.forEach ((movable) => {
                movable.position.y -= 3
            });
        }
        else if (keys.d.pressed && lastKey === 'd') {
            player.moving = true
            player.image = player.sprites.right
            for(let i=0;i<boundaries.length;i++) {
                const boundary = boundaries[i]
                if(
                    rectangularCollision({
                      rectangle1: player,
                      rectangle2: {...boundary,position: {
                          x:boundary.position.x - 3,
                          y: boundary.position.y
                      }}
                   })
              )   { console.log('holala')
                   moving = false
                   break
          }
            }
            if(moving)
            movables.forEach ((movable) => {
                movable.position.x -= 3
            })
        }
    }
        /* APPEL DE LA FONCTION ANIMATE QUI EFFECTUE QUASIMENT TOUT L'AFFICHAGE */
animate();


                                /*Creation du switch listener pour les touches pressées*/
let lastKey = '';
window.addEventListener('keydown',(e) => {
    switch (e.key) {
        case 'z' :
            keys.z.pressed = true;
            lastKey = 'z';
            break;
        case 's' :
            keys.s.pressed = true;
            lastKey = 's';
            break;
        case 'q' :
            keys.q.pressed = true;
            lastKey = 'q';
            break;
        case 'd' :
            keys.d.pressed = true;
            lastKey = 'd';
            break;

        }
    }
)

                        /*Creation du switch listener pour les touches levées*/

window.addEventListener('keyup',(e) => {
    switch (e.key) {
        case 'z' :
            keys.z.pressed = false;
            break;
        case 's' :
            keys.s.pressed = false;
            break;
        case 'q' :
            keys.q.pressed = false;
            break;
        case 'd' :
            keys.d.pressed = false;
            break;

        }
    }
)

