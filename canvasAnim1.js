function canvas() {
    var canvas = document.getElementById('canvas');
    var imitationBlock = document.getElementById("imitationBlock");
    var imitationBlock2 = document.getElementById("imitationBlock2");
    //maximal with and height of canvas
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');

        //creating a new method called roundRect that provides a rounded rectangle
        CanvasRenderingContext2D.prototype.roundRect = function(x, y, w, h, r) {
                if (w < 2 * r) r = w / 2;
                if (h < 2 * r) r = h / 2;
                this.beginPath();
                this.moveTo(x + r, y);
                this.arcTo(x + w, y, x + w, y + h, r);
                this.arcTo(x + w, y + h, x, y + h, r);
                this.arcTo(x, y + h, x, y, r);
                this.arcTo(x, y, x + w, y, r);
                this.closePath();
                return this;
            }
            //creating a new method called multiline that allow as to write multi-line text
        CanvasRenderingContext2D.prototype.multiline = function(text, x, y, fontWeight, fontSize, fontFamily, fontColor, lineHeight) {
            this.text = text;
            this.x = x;
            this.y = y;
            this.fontWeight = fontWeight;
            this.fontSize = fontSize;
            this.fontFamily = fontFamily;
            this.fontColor = fontColor;
            this.lineHeight = lineHeight

            var lines = text.split('/n');
            for (let i = 0; i < lines.length; i++) {
                ctx.fillStyle = fontColor;
                ctx.font = this.fontWeight + " " + this.fontSize + "px " + this.fontFamily;
                ctx.fillText(lines[i], x, y + (i * this.lineHeight));
            }
        }
    }
    // construcror for drawing containers and line
    function Container(dy) {
        //dy provides the duration of animation
        this.dy = dy;

        //first container
        this.containerOne = function() {
            //imitationBlock
            imitationBlock.style.top = this.y + transformScale_img + "px";
            imitationBlock.style.width = 150 + transformScale_img + 'px';
            imitationBlock.style.height = 278 + transformImage + transformPar + 'px';
            imitationBlock.style.left = 10 + randomNum + 'px';

            //container carcase
            ctx.roundRect(10 + randomNum, this.y + transformScale_img, 150 + transformScale_img, 278 + transformImage + transformPar, 5).stroke();

            //image
            const image = document.getElementById('img');
            ctx.drawImage(image, 10 + randomNum, this.y + transformScale_img, 150 + transformScale_img, this.imgHeight);

            //title
            if (click == 1) {
                ctx.fillStyle = '#BF2604';
            } else ctx.fillStyle = "black";
            ctx.font = "bold " + 15 + "px GHEAGrpalatReg";
            ctx.fillText("Ծրագրավորողների", 14 + randomNum + transformScale_img / 2, 118 + transformImage + transformScale_img + this.y);
            ctx.fillText("խումբ", 60 + randomNum + transformScale_img / 2, 133 + transformScale_img + transformImage + this.y);

            //title-line
            ctx.beginPath();
            ctx.moveTo(14 + randomNum, 138 + transformScale_img + transformImage + this.y);
            ctx.lineTo(154 + randomNum + transformScale_img, 138 + transformScale_img + transformImage + this.y);
            ctx.stroke();
            //par
            ctx.multiline(" Յուրաքանչյուր տեքստ/n պարունակում է/n բովանդակային/n պահանջ,որի/n սպառմանը ձգտելու/n արդյունքում այն/n ստեղծվել է/n հարաբերականորեն:", 13 + randomNum, 168 + transformScale_img + transformImage + this.y, "", this.parFont, "GHEAGrpalatReg", "gray", 14);
        }

        //second container
        this.containerTwo = function() {
            //imitationBlock2
            imitationBlock2.style.top = this.y2 + "px";
            imitationBlock2.style.width = 150 + transformScale_img + 'px';
            imitationBlock2.style.left = 400 + (randomNum * 2) + transformScale_img + 'px'
            imitationBlock2.style.height = 278 + transformImage + transformPar + 'px';
            //container carcase
            ctx.roundRect(400 + (randomNum * 2) + transformScale_img, this.y2, 150 + transformScale_img, 278 + transformImage + transformPar, 5).stroke();

            //image
            const image = document.getElementById('img');
            ctx.drawImage(image, 400 + (randomNum * 2) + transformScale_img, this.y2, 150 + transformScale_img, this.imgHeight);

            //title
            if (click == 1) {
                ctx.fillStyle = '#BF2604';
            } else ctx.fillStyle = "black";
            ctx.font = "bold " + 15 + "px GHEAGrpalatReg";
            ctx.fillText("Ծրագրավորողների", 405 + (randomNum * 2) + (transformScale_img + transformScale_img / 2), 118 + this.transformImage + this.y2);
            ctx.fillText("խումբ", 450 + (randomNum * 2) + (transformScale_img + transformScale_img / 2), 133 + transformImage + this.y2);

            //title-line
            ctx.beginPath();
            ctx.moveTo(405 + (randomNum * 2) + transformScale_img, 138 + transformImage + this.y2);
            ctx.lineTo(544 + transformScale_img + (randomNum * 2) + transformScale_img, 138 + transformImage + this.y2);
            ctx.stroke();
            //par
            ctx.multiline(" Յուրաքանչյուր տեքստ/n պարունակում է/n բովանդակային/n պահանջ,որի/n սպառմանը ձգտելու/n արդյունքում այն/n ստեղծվել է/n հարաբերականորեն:", 404 + (randomNum * 2) + transformScale_img, 168 + transformImage + this.y2, "", this.parFont, "GHEAGrpalatReg", "gray", 14);
        }

        //line

        this.line = function() {
            var lineX1 = 160 + transformScale_img + randomNum,
                lineX2 = 400 + transformScale_img + (randomNum * 2),
                lineY1 = 138 + transformScale_img + (transformImage / 2) + (transformPar / 2) + this.y,
                lineY2 = 134 + (transformImage / 2) + (transformPar / 2) + this.y2;
            console.log();
            ctx.beginPath();
            ctx.moveTo(lineX1, lineY1);
            ctx.lineTo(lineX2, lineY2);
            ctx.stroke();
            ctx.save();
            ctx.font = "16px GHEAGrpalatReg";

            // text rotation on the center
            ctx.translate((lineX1 + lineX2) / 2, (lineY1 + lineY2) / 2);
            ctx.rotate(Math.atan2(lineY2 - lineY1, lineX2 - lineX1));
            ctx.translate((lineX1 + lineX2) / -2, (lineY1 + lineY2) / -2);
            ctx.fillStyle = "black";
            ctx.fillText('Ուսուցում', (lineX1 + lineX2) / 2 - 30, (lineY1 + lineY2) / 2 - 5);
            ctx.restore();
        }



        //update method contains all drawings and properties for recursion
        this.update = function() {
            this.y = minTop;
            this.y2 = maxTop;
            this.parFont = parFont;
            this.imgHeight = imgHeight;
            this.transformImage = transformImage;
            this.containerOne();
            this.containerTwo();
            this.line();
        }
    }

    //array for animation examples
    var moveArray = [];
    var delay = 2;
    //null array stands as default
    moveArray.push(new Container(delay));
    //first is being activated on first click
    moveArray.push(new Container(delay));
    //second is being activated on second click
    moveArray.push(new Container(delay));

    //Animation drawing
    //variable which going to rise: 1 then 2 then again 1 (line155)
    var click = 0;
    //variable contains minimal pixels accordingly from top
    var minTop = 32;
    //variable contains maximal pixels accordingly from top
    var maxTop = 196;
    //variable sets maximal size of paragraphs
    var parFont = 14;
    //variable sets maximal size of images
    var imgHeight = 100;
    //variable resets sizes of components
    var transformImage = 0;
    var transformPar = 0;
    //transforming scales of components
    var transformScale_img = 0;
    var randomNum = 0;
    //function is being called when clicking on either block
    function animation() {
        var randomMax = Math.floor(Math.random() * 96) + 100;
        var randomMin = Math.floor(Math.random() * 7) + 25;
        randomNum = Math.floor(Math.random() * 20) + 20;
        if (click < 2) {
            click++;
        } else { click = 1; }
        //recursion function
        var anim = function() {
            //the condition for first click
            if (click == 1) {
                if (minTop < randomMax && maxTop > randomMin) {
                    requestAnimationFrame(anim);
                    minTop += delay;
                    maxTop -= delay;
                }
                if (parFont > 0) {
                    parFont--;
                    console.log(`transformPar: ${transformPar}`)
                    if (transformPar > -120) {
                        transformPar -= 10;

                    } else transformPar = -120
                }
                if (imgHeight < 100) {
                    imgHeight += 10;
                    transformImage += 10;
                } else {
                    imgHeight = 100,
                        transformImage = 0
                };
                if (transformScale_img < 98) {
                    transformScale_img++;
                } else transformScale_img = 0
            }
            //this is the condition for second click
            if (click == 2) {
                if (minTop > randomMin && maxTop < randomMax) {
                    requestAnimationFrame(anim);
                    minTop -= delay;
                    maxTop += delay
                }
                if (parFont < 13) {
                    parFont++;
                    console.log(`transformPar2: ${transformPar}`)

                    transformPar++
                } else {
                    parFont = 14;
                    transformPar = 0
                }
                if (imgHeight > 0) {
                    imgHeight -= 10;
                    transformImage -= 10;
                }

                if (transformScale_img > 0) {
                    transformScale_img--;
                }
            }
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            moveArray[click].update();

        }

        anim()

    }
    //making imitation blocks for the onclick effect
    imitationBlock.addEventListener('click', animation);
    imitationBlock2.addEventListener('click', animation);

    //defoult containerOne
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    moveArray[0].update();

}
canvas()
