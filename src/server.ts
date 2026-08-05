import { RoomManager, Server } from 'tscratch/server';
import type { PlayerState } from './state.ts';

const server = new Server({ port: 3000 });
const rm = new RoomManager<PlayerState>({
    server,
    defaultPlayerState: { x: 0, y: 0, color: 'red', radius: 35, kills: 0 },
    allowedPlayerState: ['x', 'y', 'color']
});

rm.onJoin(() => console.log('Player joined!'));

// Events
server.on('startGame', (_, client) => {

    const room = rm.rooms.values().find(room => Array.from(room.clients.keys()).includes(client.id));
    if (!room) return;

    const clients = room.clients.keys().map(id => Array.from(server.clients).find(client => client.id === id)!);

    server.broadcast('startGame', null, Array.from(clients));
});