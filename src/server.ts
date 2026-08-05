import { RoomManager, Server } from 'tscratch/server';
import type { PlayerState } from './state.ts';
import onSwallow from './logic/eating.ts';

const server = new Server({ port: 3000 });
const rm = new RoomManager<PlayerState>({
    server,
    defaultPlayerState: { x: 0, y: 0, color: 'red', radius: 35, kills: 0, alive: true },
    allowedPlayerState: ['x', 'y', 'color', 'radius']
});

rm.onPlayerStateUpdate(client => {
    
    const room = rm.rooms.values().find(room => room.clients.has(client.id))!;
    if (!room) return;
    const { clients } = room;

    // Eat player if he's inside
    onSwallow(clients, (eaterId, eatenId) => {
        const eaterState = clients.get(eaterId)!;
        const eatenState = clients.get(eatenId)!;
        rm.updatePlayerState(eaterId, { kills: (eaterState.kills + 1), radius: (eaterState.radius + eatenState.radius) }, false);
        rm.updatePlayerState(eatenId, { alive: false }, false);
    });
});

// Events
server.on('startGame', (_, client) => {

    const entry = rm.rooms.entries().find(entry => Array.from(entry[1].clients.keys()).includes(client.id));
    if (!entry) return;

    const [roomId, room] = entry;

    // Stop other players from joing the game after it begins
    rm.disableJoining(roomId);

    // Space out (Euler's identity)
    const clientIds = Array.from(room.clients.keys());
    const n = room.clients.size;

    for (let k = 0; k < n; k++) {
        rm.updatePlayerState(clientIds[k]!, {
            x: 150 * Math.cos(2 * k * Math.PI / n),
            y: 150 * Math.sin(2 * k * Math.PI / n)
        });
    }

    // Send the start notification
    const clients = clientIds.map(id => Array.from(server.clients).find(client => client.id === id)!);
    server.broadcast('startGame', null, Array.from(clients));
});