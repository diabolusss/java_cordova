function PasswordCard(number, digitArea, includeSymbols) {
    this.number = number;
    this.digitArea = digitArea;
    this.includeSymbols = includeSymbols;
    this.grid = null;
    this.WIDTH = 30;
    this.HEIGHT = 9;
    this.HEADER_CHARS = "■□▲△○●★☂☀☁☹☺♠♣♥♦♫!?¡¿⊙◐◩�♂♀☼☻◙◘∞◊†◃☦".split("");
    
    //this.HEADER_CHARS = "■□▲△○●★☂☀☁☹☺♠♣♥♦♫€¥£$!?¡¿⊙◐◩�";
    this.DIGITS = "0123456789";
    this.DIGITS_AND_LETTERS = "23456789abcdefghjkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ";
    this.DIGITS_LETTERS_AND_SYMBOLS = "23456789abcdefghjkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ@#$%&*<>?+{}[]()/\\";
}
PasswordCard.prototype.getGrid = function () {
    if (this.grid == null) this.generateGrid();
    return this.grid;
};
PasswordCard.prototype.generateGrid = function () {
    this.grid = new Array(this.HEIGHT);
    for (var i = 0; i < this.HEIGHT; i++) this.grid[i] = new Array(this.WIDTH);
    var random = new Random(this.number);
    var headerChars = this.HEADER_CHARS;
    for (var i = headerChars.length; i > 1; i--) {
        var k = i - 1;
        var j = parseInt(random.nextInt(i).toString());
        var tmp = headerChars[k];
        headerChars[k] = headerChars[j];
        headerChars[j] = tmp;
    }
    if (headerChars.length > this.WIDTH) {
        //alert("How the hell did this happen?!");
        //var tmp = headerChars;
        //headerChars = new Int8Array(this.WIDTH);
        //for (var i = 0; i < this.WIDTH; i++) headerChars[i] = tmp[i];
		headerChars.length = this.WIDTH;
    }
    this.grid[0] = headerChars;

    var t;
    if (this.digitArea) {        
        for (var y = 1; y < this.HEIGHT; y++) {
            for (var x = 0; x < this.WIDTH; x++) {
                t = parseInt(random.nextInt(this.DIGITS.length).toString());
                this.grid[y][x] = this.DIGITS.charAt(t);
            }
        }
    }
    else {
        for (var y = 1; y < this.HEIGHT; y++) {
            for (var x = 0; x < this.WIDTH; x++) {
                if (this.includeSymbols && ((x % 2) == 0)) {
                    t = parseInt(random.nextInt(this.DIGITS_LETTERS_AND_SYMBOLS.length).toString());
                    this.grid[y][x] = this.DIGITS_LETTERS_AND_SYMBOLS.charAt(t);
                }
                else {
                    t = parseInt(random.nextInt(this.DIGITS_AND_LETTERS.length).toString());
                    this.grid[y][x] = this.DIGITS_AND_LETTERS.charAt(t);
                }
            }
        }
    }
};

addEventListener("load", function () {
	var length = document.getElementById("seedlength").value;
    //document.getElementById("seed").value = localStorage.seed || randomSeed(length);
    var fontsig = {i: [10, 17], o: [10, 17]};
    onFontLoad(function () {
        document.getElementById("generateBtn").addEventListener("click", generate, false);
    }, "FreeMono", "0px", fontsig);
    //find some way to check this
}, false);

function generate() {
	var length = document.getElementById("seedlength").value;
    var constseed = document.getElementById("constseed").checked;
	
    var showgrid = document.getElementById("grid").checked;
    var highcontrast = document.getElementById("highcontrast").checked;

    var seed = document.getElementById("seed").value;
	if(!constseed){		
		seed = randomSeed(length);
	    document.getElementById("seed").value = seed;
	}
    localStorage.seed = seed;
    var digitarea = document.getElementById("numbersonly").checked;
    var symbols = document.getElementById("symbols").checked;

    var card = new PasswordCard(seed, digitarea, symbols);
    var grid = card.getGrid();

    var canvcard = new CanvasCard("cardCanvas", seed, grid);

	var defaultview = document.getElementById("defaultview").checked;
    canvcard.measure(defaultview);
    //canvcard.drawBorders();
    if(defaultview) canvcard.drawValues(highcontrast);
	else  canvcard.drawValuesNew(highcontrast);

    if (showgrid) canvcard.drawGrid();
}

function onFontLoad(cb, font, size, table, interval) {
    var div = document.createElement("div");
    div.style.fontFamily = font;
    div.style.fontSize = size;
    //div.style.position = "relative";
    document.body.appendChild(div);
    var checkInterval = setInterval(function () {
        for (var character in table) {
            div.textContent = character;
            var t = table[character];
            var s = getComputedStyle(div);
        }
        clearTimeout(checkInterval);
        cb();
    }, interval || 200);
}

function randomSeed(length) {
    var r = "";
    for (var i = 0; i < length; i++) {
        r += Math.floor(Math.random() * (length+1)).toString(length);
    }
    while (r.charAt(0) == "0") r = r.substr(1);
    return r;
}
