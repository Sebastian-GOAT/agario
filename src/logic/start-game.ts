import { player, text } from '@/sprites/main.ts';
import { Engine } from 'tscratch';
import { btnStart } from '@/sprites/buttons.ts';
import { conn } from '@/global.ts';

const engine = Engine.init();

export default function startGame() {
    const { x, y } = conn.getRoomPlayerState();

    engine.setScene('game');
    text.setContent('Kills: 0');
    btnStart.hide();
    player.goTo(x, y);
}