import { player, text } from '@/sprites/main.ts';
import { canvas, Engine, Watermark } from 'tscratch';
import { btnStart } from '@/sprites/buttons.ts';
import { conn } from '@/global.ts';
import { displayCount, leaderboard, leaderboardOptions } from '@/sprites/leaderboard.ts';

const engine = Engine.init();

export default function startGame() {
    const { x, y } = conn.getRoomPlayerState();

    engine.setScene('game');
    text.setContent('Kills: 0');
    btnStart.hide();
    player.goTo(x, y);

    for (let i = 0; i < Math.min(displayCount, conn.roomClients.size); i++)
        leaderboard.push(new Watermark({ ...leaderboardOptions, y: canvas.height / 2 - 5 - i * 20 }));
}