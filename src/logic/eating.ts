import type { PlayerState } from '@/state.ts';

export default function onSwallow(
    clients: Map<string, PlayerState>,
    callback: (eaterId: string, eatenId: string) => void
) {
    const entries = Array.from(clients.entries());

    for (let i = 0; i < entries.length; i++) {
        const [id1, state1] = entries[i]!;

        if (!state1.alive) continue;

        for (let j = i + 1; j < entries.length; j++) {
            const [id2, state2] = entries[j]!;

            if (!state2.alive) continue;

            const dx = state1.x - state2.x;
            const dy = state1.y - state2.y;
            const distanceSquared = dx * dx + dy * dy;

            // Check if they are colliding
            if (state1.radius > state2.radius) {
                const diff = state1.radius - state2.radius;
                if (distanceSquared < diff * diff) callback(id1, id2);
            }
            if (state2.radius > state1.radius) {
                const diff = state2.radius - state1.radius;
                if (distanceSquared < diff * diff) callback(id2, id1);
            }
        }
    }
}