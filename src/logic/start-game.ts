import { conn } from '@/global.ts';
import { player, text } from '@/sprites/main.ts';
import { Engine, TSCMath } from 'tscratch';
import { btnStart } from '@/sprites/buttons.ts';

const engine = Engine.init();

export default function startGame() {

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