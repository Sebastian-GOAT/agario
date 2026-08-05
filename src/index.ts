import { Circle, Engine, Pen, Text } from 'tscratch';
import './events/controls.ts';
import startGame from './logic/start-game.ts';
import { pen } from './sprites/main.ts';
import { conn } from './global.ts';

const engine = Engine.init();
engine.setScene('lobby');

conn.on('startGame', startGame);

// Rendering loop
engine.setLoop('game', () => {

    // Clear the canvas before rendering
    pen.eraseAll();

    // Draw each sprite (relative to the player)
    const playerState = conn.getRoomPlayerState();
    for (const state of conn.roomClients.values()) {
        if (!state.alive) continue;
        
        Pen.drawSprite(Circle, {
            x: state.x - playerState.x,
            y: state.y - playerState.y,
            radius: state.radius,
            color: state.color
        });
    }

    // Show a death message if eliminated
    if (!playerState.alive) {
        Pen.drawSprite(Text, {
            content: 'You have been eliminated...',
            fontSize: 32
        });
    }
});