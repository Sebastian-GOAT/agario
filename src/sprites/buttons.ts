import { Button, Engine } from 'tscratch';
import { conn, color } from '@/global.ts';
import { text } from '@/sprites/main.ts'

export const btnCreate = new Button({
    x: 375,
    y: -200,
    width: 125,
    content: 'Create room',
    scene: 'lobby'
});
export const btnJoin = new Button({
    x: 375,
    y: -230,
    width: 125,
    content: 'Join room',
    scene: 'lobby'
});
export const btnStart = new Button({
    x: 375,
    y: -230,
    width: 125,
    content: 'Start game',
    scene: 'lobby',
    hidden: true
});

btnCreate.onPress(() => {
    conn.createRoom({ color, radius: 50 });
    conn.onRoomJoin(() => {
        console.log(conn.roomId);
        btnCreate.hide();
        btnJoin.hide();
        btnStart.show();

        // Render the player count in the lobby (show only to the host)
        Engine.init().setLoop('lobby', () => {
            if (!conn.roomId) return;
            text.setContent(`Room ID: ${conn.roomId}    Players: ${conn.roomClients.size}`);
        });
    });
}, { allowHold: false });
btnJoin.onPress(() => {

    const input = prompt('Please enter the room ID.');
    if (!input) return;

    conn.joinRoom(input, { color, radius: 75 });
    conn.onRoomJoin(() => {
        text.setContent('Waiting for host...');
        btnCreate.hide();
        btnJoin.hide();
    });
}, { allowHold: false });
btnStart.onPress(() => {

    if (!conn.roomId) return;
    conn.emit('startGame', null);
    
}, { allowHold: false });