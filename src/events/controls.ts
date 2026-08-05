import { Engine } from 'tscratch';
import { conn, speed } from '@/global.ts';
import { player } from '@/sprites/main.ts';

const engine = Engine.init();

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