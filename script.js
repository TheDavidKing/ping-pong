let WIDTH = 550
let HEIGHT = 400
let draw = SVG().addTo("#game").size(WIDTH, HEIGHT)//Создаем карту игры
let rect = draw.rect(WIDTH, HEIGHT).attr({ fill: '#EEE154' })
let ball = draw.circle(20).fill("red").cx(WIDTH/2).cy(HEIGHT/2)//Рисуем мячик
let racet1 = draw.rect(15, 80).fill("green").move(15, HEIGHT/2-40)//Рисуем левую ракетку и перемещаем его в нужное место
let racet2 = draw.rect(15, 80).fill("orange").move(WIDTH-30, HEIGHT/2-40)
let text_l = draw.text("0").move(30, 20).font({size:"44px"})
let text_r = draw.text("0").move(WIDTH-50, 20).font({size:"44px"})
let step_x = 2
let step_y = 2
let step_left = 0
let step_right = 0
let wr = 0
let wl = 0
let is_start = false
let interval = 0
function move(){
    let x = ball.cx()
    let y = ball.cy()
    x += step_x
    y += step_y
    if(x < 10){
        step_x = - step_x
        wr += 1
        text_r.text(wr)
        center_ball()
    }
    if(x > WIDTH-10){
        step_x = - step_x
        wl += 1
        text_l.text(wl)
        center_ball()
        
    }
    if(y < 10){
        step_y = - step_y
    }
    if(y > HEIGHT-10){
        step_y = - step_y
    }
    //Условие столкновения мячика с левой ракеткой
    let collision_racet1 = x <= racet1.x() + racet1.width() && y <= racet1.y() + racet1.height() && y >= racet1.y()
    if(collision_racet1){
        step_x = -step_x
        x = racet1.x() + racet1.width()
    }
    let collision_racet2 = x >= racet2.x() && y <= racet2.y() + racet2.height() && y >= racet2.y()
    if(collision_racet2){
        step_x = -step_x
        x = racet2.x() - 20
    }
    if(wl == 1 || wr == 1){
    if(is_start == true){
        clearInterval(interval)
        center_ball()
        is_start = false
    }
    alert("the win is " + racet1.fill())
    wl = 0
    wr = 0
    racet1.move(15, HEIGHT/2-40)
    racet2.move(WIDTH-30, HEIGHT/2-40)
    text_l.text(wl)
    text_r.text(wr)
    }
    ball.cx(x)
    ball.cy(y)
}
//addEventListener позволяет добавлять несколько обработчиков на одно событие.
//Значит мы сможем управлять двумя ракетками с помощью нажатия клавиш.
document.addEventListener("keydown", function(event){//left racet
    let key = event.key
    if(key == "w"){
        step_left -= 2
        racet1.dy(step_left)//dy - функция, которая позволяет изменять текущий y ракетки
        if(racet1.y() < 0){
            racet1.y(0)
        }
    }
    if(key == "s"){
        step_left += 2
        racet1.dy(step_left)
        if(racet1.y() > HEIGHT-40){
            racet1.y(HEIGHT-80)
        }
    }
})
document.addEventListener("keyup", function(event){//left racet
    let key = event.key
    if(key == "w"){
        step_left = 0
        racet1.dy(step_left)
    }
    if(key == "s"){
        step_left = 0
        racet1.dy(step_left)
    }
})

document.addEventListener("keydown", function(event){//right racet
    let key = event.key
    if(key == "ArrowUp"){
        step_right -= 2
        racet2.dy(step_right)
        if(racet2.y() < 0){
            racet2.y(0)
        }
    }
    if(key == "ArrowDown"){
        step_right += 2
        racet2.dy(step_right)
        if(racet2.y() > HEIGHT-40){
            racet2.y(HEIGHT-80)
        }
    }
})
document.addEventListener("keyup", function(event){//right racet
    let key = event.key
    if(key == "ArrowUp"){
        step_right = 0
        racet2.dy(step_right)
    }
    if(key == "ArrowDown"){
        step_right = 0
        racet2.dy(step_right)
    }
})
document.querySelector("#ss").onclick=function(){
    if(is_start == false){
        interval = setInterval(() => {
            move()
        }, 10);
        is_start = true
    }
    else{
        clearInterval(interval)
        is_start = false
    }
}
function center_ball(){
    ball.cx(WIDTH/2).cy(HEIGHT/2)
}
document.querySelector("#reset").onclick=function(){
    center_ball()
    wl = 0
    wr = 0
    racet1.move(15, HEIGHT/2-40)
    racet2.move(WIDTH-30, HEIGHT/2-40)
    if(is_start == true){
        clearInterval(interval)
        is_start = false
    }
    text_l.text(wl)
    text_r.text(wr)
}
