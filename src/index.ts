import { Button, Circle, Engine, Multiplayer, Pen, TSCMath, Watermark } from 'tscratch';
import type { PlayerState } from './state.ts';

const engine = Engine.init();
engine.setScene('lobby');

// Constants
const speed = 7;
const color = 'black';

// Sprites
const pen = new Pen;

const player = new Circle({ hidden: true, scene: 'game' });

const btnCreate = new Button({
    x: 375,
    y: -200,
    width: 125,
    content: 'Create room',
    scene: 'lobby'
});
const btnJoin = new Button({
    x: 375,
    y: -230,
    width: 125,
    content: 'Join room',
    scene: 'lobby'
});
const btnStart = new Button({
    x: 375,
    y: -230,
    width: 125,
    content: 'Start game',
    scene: 'lobby',
    hidden: true
});

const text = new Watermark({ content: '', scene: '*' });

// Connection
const conn = new Multiplayer<PlayerState>('localhost:3000');

// Lobby button click events
btnCreate.onPress(() => {
    conn.createRoom({ color });
    conn.onRoomJoin(() => {
        console.log(conn.roomId);
        text.setContent(`Room ID: ${conn.roomId}`);
        btnCreate.hide();
        btnJoin.hide();
        btnStart.show();
    });
}, { allowHold: false });
btnJoin.onPress(() => {

    const input = prompt('Please enter the room ID.');
    if (!input) return;

    conn.joinRoom(input, { color });
    conn.onRoomJoin(() => {
        text.setContent('Waiting for host...');
        btnCreate.hide();
        btnJoin.hide();
    });
}, { allowHold: false });
btnStart.onPress(() => {

    if (!conn.roomId) return;

    // Stop other connections ?????

    conn.emit('startGame', null);
}, { allowHold: false });

// Game start
function startGame() {

    engine.setScene('game');

    // Space out (Euler's identity)
    const k = Array.from(conn.roomClients.keys()).indexOf(conn.id!);
    const n = conn.roomClients.size;
    player.goTo(
        150 * TSCMath.cos(2 * k * 180 / n),
        150 * TSCMath.sin(2 * k * 180 / n)
    );
    conn.updatePlayerState({ x: player.x, y: player.y });

    text.setContent('Kills: 0');
    btnStart.hide();
}

conn.on('startGame', () => startGame());

// Contorls
engine.onKeyPress('w', () => {
    if (!conn.roomId || engine.currentScene !== 'game') return;
    player.changeY(+speed);
    conn.updatePlayerState({ y: player.y });
});
engine.onKeyPress('a', () => {
    if (!conn.roomId || engine.currentScene !== 'game') return;
    player.changeX(-speed);
    conn.updatePlayerState({ x: player.x });
});
engine.onKeyPress('s', () => {
    if (!conn.roomId || engine.currentScene !== 'game') return;
    player.changeY(-speed);
    conn.updatePlayerState({ y: player.y });
});
engine.onKeyPress('d', () => {
    if (!conn.roomId || engine.currentScene !== 'game') return;
    player.changeX(+speed);
    conn.updatePlayerState({ x: player.x });
});

// Rendering loop
engine.setLoop('game', () => {

    pen.eraseAll();

    for (const state of conn.roomClients.values()) {
        Pen.drawSprite(Circle, {
            x: state.x,
            y: state.y,
            radius: state.radius,
            color: state.color
        });
    }
});