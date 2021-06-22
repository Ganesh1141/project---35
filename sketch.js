//Create variables here
var dog, dogImg, dogImg1
var database, food, foodStock

function preload(){
	//load images here
  dogImg = loadImage("images/dogImg.png")
  dogImg1 = loadImage("images/dogImg1.png")
}

function setup() {
	createCanvas(800, 700);
  database = firebase.database()

  dog = createSprite(250, 300, 150, 150)
  dog.addImage(dogImg)
  dog.scale = 0.15

  foodStock = database.ref('food')
  foodStock.on("value", readStock)
  textSize(20)
}


function draw() {  
 background("lightblue")
 if(keyWentDown(UP_ARROW)){
   writeStock(food) 
   dog.addImage(dogImg1)
   
 }
  drawSprites();
  //add styles here
fill("orange")
stroke("black")
text("Food Remaing: " + food, 170, 200)
textSize(20)
text("Note: Press Up Arrow To Feed The Milk  ", 130, 10, 300, 20)
}

function readStock(data){
  food = data.val()
}

function writeStock(x){
  if(x<=0){
    x = 0
  }
  else{
    x = x-1
  }
  database.ref('/').update({
    food:x
  })
}