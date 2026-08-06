import { conn } from '@/global.ts';
import { canvas, Watermark, type WatermarkOptions } from 'tscratch';

export const leaderboardOptions: WatermarkOptions = {
    align: 'right',
    x: canvas.width / 2 - 5,
    scene: 'game'
};

export const leaderboard: Watermark[] = [];
export const displayCount = 5;

export function updateLeaderboard() {

    if (!conn) {
        for (const rank of leaderboard) rank.setContent('');
        return;
    }

    const states = Array.from(conn.roomClients.values()).sort((a, b) => b.kills - a.kills).slice(0, displayCount);

    for (let i = 0; i < states.length; i++) {
        const state = states[i]!;
        leaderboard[i]!.setContent(`${state.username}: ${state.kills} kills, ${i + 1}${i === 0 ? 'st' : i === 1 ? 'nd' : i === 2 ? 'rd' : 'th'} place`);
    }
}