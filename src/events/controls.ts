import { Engine } from 'tscratch';
import { conn, speed } from '@/global.ts';
import { player } from '@/sprites/main.ts';

const engine = Engine.init();

const invalid = () => !conn.roomId ||
                    engine.currentScene !== 'game' ||
                    !conn.getRoomPlayerState().alive;

engine.onKeyPress('w', () => {
    if (invalid()) return;
    player.changeY(+speed);
    conn.updatePlayerState({ y: player.y });
});
engine.onKeyPress('a', () => {
    if (invalid()) return;
    player.changeX(-speed);
    conn.updatePlayerState({ x: player.x });
});
engine.onKeyPress('s', () => {
    if (invalid()) return;
    player.changeY(-speed);
    conn.updatePlayerState({ y: player.y });
});
engine.onKeyPress('d', () => {
    if (invalid()) return;
    player.changeX(+speed);
    conn.updatePlayerState({ x: player.x });
});