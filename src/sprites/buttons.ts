import { Button } from 'tscratch';
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
    conn.createRoom({ color });
    conn.onRoomJoin(() => {
        console.log(conn.roomId);
        text.setContent(`Room ID: ${conn.roomId}`);
        btnCreate.hide();
        btnJoin.hide();
        btnStart.show();
    });
}, { allowHold: false });
btnJoin.onPress(() => {

    const input = prompt('Please enter the room ID.');
    if (!input) return;

    conn.joinRoom(input, { color });
    conn.onRoomJoin(() => {
        text.setContent('Waiting for host...');
        btnCreate.hide();
        btnJoin.hide();
    });
}, { allowHold: false });
btnStart.onPress(() => {

    if (!conn.roomId) return;

    // Stop other connections ?????

    conn.emit('startGame', null);
}, { allowHold: false });