song="";
leftwristx=0;
leftwristy=0;
rightwristx=0;
rightwristy=0;

scoreleftwrist=0;
scorerightwrist=0;
function preload(){
    song=loadSound("song.mp3")
}

function setup(){
    canvas = createCanvas(600,500);
    canvas.center();

    video=createCapture(VIDEO);
 video.hide();  
 
 poseNet=ml5.poseNet(video,modelLoaded)
 poseNet.on('pose',gotposes);
}

function modelLoaded(){
    console.log("posenet is initialized")
}

function draw(){
    image(video,0,0,600,500);
    fill("#03f4fc");
    stroke("#03d3fc");0
    if(scoreleftwrist>0.2){
        circle(leftwristx,leftwristy,20);
        InNumberleftwristy=Number(leftwristy);
        remove_decimal=floor(InNumberleftwristy);
        volume=remove_decimal/500;
        document.getElementById("volume").innerHTML="Volume - "+volume;
        song.setVolume(volume);
    }

    if(scorerightwrist>0.2){
        circle(rightwristx,rightwristy,20);
    if(rightwristy>0 && rightwristy<=100){
        song.rate(0.5);
        document.getElementById("speed").innerHTML="Speed - 0.5x ";
    }

    else if(rightwristy>100 && rightwristy<=200){
        song.rate(1);
        document.getElementById("speed").innerHTML="Speed - 1x ";
    }
   
    else if(rightwristy>200 && rightwristy<=300){
        song.rate(1.5);
        document.getElementById("speed").innerHTML="Speed - 1.5x ";
    }
   
    else if(rightwristy>300 && rightwristy<=400){
        song.rate(2);
        document.getElementById("speed").innerHTML="Speed - 2x ";
    }
   
    else if(rightwristy>400 && rightwristy<=500){
        song.rate(2.5);
        document.getElementById("speed").innerHTML="Speed - 2.5x ";
    }
   
    }
         
}
function play(){
    song.play();
    song.setVolume(1);
    song.rate(1)
}
function gotposes(results){
 if(results.length>0){
    console.log(results);
    leftwristx=results[0].pose.leftWrist.x;
    leftwristy=results[0].pose.leftWrist.y;
    rightwristx=results[0].pose.rightWrist.x;
    rightwristy=results[0].pose.rightWrist.y;

    scoreleftwrist=results[0].pose.keypoints[9].score
    scorerightwrist=results[0].pose.keypoints[10].score
 }   
}