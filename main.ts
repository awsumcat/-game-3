radio.onReceivedNumber(function (receivedNumber) {
    basic.showNumber(receivedNumber)
})
input.onButtonPressed(Button.A, function () {
    player.change(LedSpriteProperty.Y, 1)
})
input.onButtonPressed(Button.AB, function () {
    if (game.isPaused()) {
        game.resume()
    } else {
        game.pause()
        basic.showString("P:" + points)
        basic.showString("L:" + lives)
    }
})
input.onButtonPressed(Button.B, function () {
    player.change(LedSpriteProperty.Y, -1)
})
let points = 0
let lives = 0
let player: game.LedSprite = null
let enemy = game.createSprite(0, randint(0, 4))
player = game.createSprite(4, 3)
player.set(LedSpriteProperty.Blink, 500)
lives = 3
points = 0
let speed = 1000
radio.setGroup(1)
basic.forever(function () {
    basic.pause(speed)
    enemy.change(LedSpriteProperty.X, 1)
})
basic.forever(function () {
    if (enemy.isTouching(player)) {
        lives += -1
        music.playTone(131, music.beat(BeatFraction.Whole))
        enemy.set(LedSpriteProperty.X, 0)
        enemy.set(LedSpriteProperty.Y, randint(0, 4))
        if (lives == 0) {
            music.playMelody("C5 A C5 B F F A B ", 200)
            basic.clearScreen()
            basic.showString("you lost!!!!!")
        }
    }
})
basic.forever(function () {
    if (enemy.get(LedSpriteProperty.X) == 4) {
        basic.pause(speed)
        points += 1
        enemy.set(LedSpriteProperty.X, 0)
        enemy.set(LedSpriteProperty.Y, randint(0, 4))
    }
})
basic.forever(function () {
    if (speed == 100) {
        basic.clearScreen()
        basic.showString("game won!!!")
        basic.showNumber(points)
    }
})
basic.forever(function () {
    if (points % 10 == 0 && points != 0) {
        speed = speed / 2
        music.playTone(392, music.beat(BeatFraction.Eighth))
        radio.sendNumber(speed)
    }
})
