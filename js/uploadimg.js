var orig_image=null;
//var editedimg=null;
var canvas = document.getElementById("picture_canvas");
//var tcanvas = document.getElementById("teszt_canvas");    //teszthez

var view_img_orig=null;
var hide_img_orig=null;


function randomone() { // 0 és 1 közötti véletlen szám
    var x = Math.random();
    return(x);
}

function randomten() { // -10 és + 10 közti véletlen szám
    var x = Math.floor((randomone() * 10) + 1);
    x = x* (Math.round(randomone()) * 2 - 1);
    return(x);
}





function printIMG(img,canvp) {  
  if (img === undefined) {alert("No picture");} 
  else {if (canvp === undefined) {alert("No canvas");} else{img.drawTo(canvp);}}
}

function loadImage() {
  var limg = document.getElementById("picture_input");
  orig_image = new SimpleImage(limg);
  editedimg = new SimpleImage(limg);
  printIMG(orig_image,canvas);
}

function resetIMG() {
  if (orig_image == null) {alert("No Loaded Picture")}
  else{
  printIMG(orig_image,canvas);
}
}

  
function delIMG() {
  editedimg = null;
  orig_image = null;
 var ctx = canvas.getContext("2d");
 ctx.clearRect(0,0,canvas.width,canvas.height);
}


function loadImage_s() {
  var limg = document.getElementById("picture_miben");
  view_img_orig = new SimpleImage(limg);
  var canvass = document.getElementById("stega_canvas1");
  printIMG(view_img_orig,canvass);
}

function loadImage_h() {
  var limg = document.getElementById("picture_mit");
  hide_img_orig = new SimpleImage(limg);
  var canvas_h = document.getElementById("stega_canvas2");
  printIMG(hide_img_orig,canvas_h);
}


function prepImages() {
	// for each pixel of image0 clear the last 4 bits of the r, g, b values
	for (var pixel of image0.values()) {
		pixel.setRed(Math.floor(pixel.getRed()/16) * 16);
		pixel.setGreen(Math.floor(pixel.getGreen()/16) * 16);
		pixel.setBlue(Math.floor(pixel.getBlue()/16) * 16);
	}
	// for each pixel in image1 the 4 MSD become the 4 LSD for the r,g, b values
		for (var pixel of image1.values()) {
				pixel.setRed(Math.floor(pixel.getRed()/16));
				pixel.setGreen(Math.floor(pixel.getGreen()/16));
				pixel.setBlue(Math.floor(pixel.getBlue()/16));
		}

}


function shift(image) {
for (var pixel of image.values()) {
var newred = lastpixels(pixel.getRed());
var newgreen = lastpixels(pixel.getGreen());
var newblue = lastpixels(pixel.getBlue());
pixel.setRed(newred);
pixel.setGreen(newgreen);
pixel.setBlue(newblue);
}
return(image);
}

function firstpixels(pixel) {
    var x = Math.floor(pixel/16)*16;
    return(x);
}

function lastpixels(pixel) {
    var x = Math.floor(pixel/16);
    return(x);
}

function maradfirst(pixel) {
    var x = Math.floor(pixel%16)*16;
    return(x);
}






function chop2hide(image) {
for (var pixel of image.values()) {
var newred = firstpixels(pixel.getRed());
var newgreen = firstpixels(pixel.getGreen());
var newblue = firstpixels(pixel.getBlue());
pixel.setRed(newred);
pixel.setGreen(newgreen);
pixel.setBlue(newblue);
}
return(image);
}




function hidingpict(image) {
for (var pixel of image.values()) {
var newred = maradfirst(pixel.getRed());
var newgreen = maradfirst(pixel.getGreen());
var newblue = maradfirst(pixel.getBlue());
pixel.setRed(newred);
pixel.setGreen(newgreen);
pixel.setBlue(newblue);
}
return(image);
}



function combine(image_in, image_hide) {
    for(var pixel of image_in.values()) {
    var x = pixel.getX();
    var y = pixel.getY();
    var hpixel = image_hide.getPixel(x,y);
    var newred =  pixel.getRed() + hpixel.getRed();
    var newgreen =  pixel.getGreen() + hpixel.getGreen();
    var newblue =  pixel.getBlue() + hpixel.getBlue();
    pixel.setRed(newred);
    pixel.setGreen(newgreen);
    pixel.setBlue(newblue);
    }
    return image_in;
}