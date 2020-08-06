function canvas() {
    var canvas = document.getElementById('canvas');
    var imitationBlock = document.getElementById("imitationBlock");
    var imitationBlock2 = document.getElementById("imitationBlock2");
    //maximal with and height of canvas
    canvas.width = 663;
    canvas.height = 663;
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
        //these are declared properties which have not value yet 
        this.y = undefined;
        this.y2 = undefined;
        this.titeFont = undefined;
        this.parFont = undefined;
        this.imgWidth = undefined;
        this.lineText = undefined;

        //first container
        this.containerOne = function() {
            //imitationBlock
            imitationBlock.style.top = this.y + "px";
            //container carcase
            ctx.roundRect(10, this.y, 150, 278, 5).stroke();

            //image
            const image = document.getElementById('img');
            ctx.drawImage(image, 10, this.y, this.imgWidth, 100);

            //title
            ctx.fillStyle = "black";
            ctx.font = "bold " + this.titeFont + "px GHEAGrpalatReg";
            ctx.fillText("Ծրագրավորողների", 14, 118 + this.y);
            ctx.fillText("խումբ", 60, 133 + this.y);

            //title-line
            ctx.beginPath();
            ctx.moveTo(14, 138 + this.y);
            ctx.lineTo(154, 138 + this.y);
            ctx.stroke();
            //par
            ctx.multiline(" Յուրաքանչյուր տեքստ/n պարունակում է/n բովանդակային/n պահանջ,որի/n սպառմանը ձգտելու/n արդյունքում այն/n ստեղծվել է/n հարաբերականորեն:", 13, 168 + this.y, "", this.parFont, "GHEAGrpalatReg", "gray", 14);
        }

        //second container
        this.containerTwo = function() {
            //imitationBlock2
            imitationBlock2.style.top = this.y2 + "px";
            //container carcase
            ctx.roundRect(400, this.y2, 150, 278, 5).stroke();

            //image
            const image = document.getElementById('img');
            ctx.drawImage(image, 400, this.y2, imgWidth, 100);

            //title
            ctx.fillStyle = "black";
            ctx.font = "bold " + this.titeFont + "px GHEAGrpalatReg";
            ctx.fillText("Ծրագրավորողների", 405, 118 + this.y2);
            ctx.fillText("խումբ", 450, 133 + this.y2);

            //title-line
            ctx.beginPath();
            ctx.moveTo(405, 138 + this.y2);
            ctx.lineTo(544, 138 + this.y2);
            ctx.stroke();
            //par
            ctx.multiline(" Յուրաքանչյուր տեքստ/n պարունակում է/n բովանդակային/n պահանջ,որի/n սպառմանը ձգտելու/n արդյունքում այն/n ստեղծվել է/n հարաբերականորեն:", 404, 168 + this.y2, "", this.parFont, "GHEAGrpalatReg", "gray", 14);
        }

        //line
        this.line = function() {
            ctx.beginPath();
            ctx.moveTo(160, 138 + this.y);
            ctx.lineTo(400, 134 + this.y2);
            ctx.stroke();

            ctx.save();
            ctx.font = "16px GHEAGrpalatReg";

            // Matrix transformation to center of out text
            ctx.translate(280, 247);
            ctx.rotate(.6 + lineText);
            ctx.translate(-280, -247);
            ctx.fillStyle = "black";
            ctx.fillText('Ուսուցում', 250, 247);
            ctx.restore();
        }



        //update method contains all drawings and properties for recursion
        this.update = function() {
            this.y = minTop;
            this.y2 = maxTop;
            this.titeFont = titleFont;
            this.parFont = parFont;
            this.imgWidth = imgWidth;
            this.lineText = lineText;
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
    //variable sets maximal size of titles
    var titleFont = 15;
    //variable sets maximal size of paragraphs
    var parFont = 14;
    //variable sets maximal size of images
    var imgWidth = 150;
    var lineText = 0;

    //function is being called when clicking on either block
    function animation() {
        var randomMax = Math.floor(Math.random() * 96) + 100;
        var randomMin = Math.floor(Math.random() * 2) + 30;
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
                if (titleFont > 0) { titleFont--; }
                if (parFont > 0) { parFont--; }
                if (imgWidth < 150) { imgWidth += 10; } else { imgWidth = 150 };
                lineText -= 0.015;
            }
            //this is the condition for second click
            if (click == 2) {
                if (minTop > randomMin && maxTop < randomMax) {
                    requestAnimationFrame(anim);
                    titleFont++;
                    minTop -= delay;
                    maxTop += delay
                }
                if (titleFont < 14) { titleFont++; } else { titleFont = 14; }
                if (parFont < 13) { parFont++; } else { parFont = 13; }
                if (imgWidth > 0) { imgWidth -= 10; }

                lineText += 0.015;
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
