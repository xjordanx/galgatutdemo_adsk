// Important Notes:
// 
// - The AU2022 badge only has two buttons, which are configured as "UP" and "DOWN" controllers. Thus the movement of the spacePlane is restricted and there's no fire button. In this game, the ship just fires continually.
// 
// - This badge requires that the initial configuration firmware has already been loaded.
// 
// The firmware for this game and configuration can be found in the GitHub repository.
controller.down.onEvent(ControllerButtonEvent.Released, function () {
    spacePlane.x += -5
})
controller.up.onEvent(ControllerButtonEvent.Released, function () {
    spacePlane.x += 5
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    bogey.destroy(effects.fire, 200)
    info.changeScoreBy(1)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    otherSprite.destroy(effects.spray, 200)
    info.changeLifeBy(-1)
})
let projectile: Sprite = null
let bogey: Sprite = null
let spacePlane: Sprite = null
if (control.deviceDalVersion() != "sim") {
    pins.P23.setPull(0)
pins.P24.setPull(0)
}
spacePlane = sprites.create(assets.image`spacePlane`, SpriteKind.Player)
spacePlane.setStayInScreen(true)
controller.moveSprite(spacePlane, 200, 200)
info.setLife(3)
spacePlane.x = 24
pins.P23.setPull(PinPullMode.PullDown)
pins.P24.setPull(PinPullMode.PullDown)
game.onUpdateInterval(1000, function () {
    bogey = sprites.create(assets.image`Enemy`, SpriteKind.Enemy)
    bogey.setVelocity(-100, 0)
    bogey.setPosition(160, randint(5, 115))
})
game.onUpdateInterval(200, function () {
    projectile = sprites.createProjectileFromSprite(assets.image`Projectile`, spacePlane, 200, 0)
})
