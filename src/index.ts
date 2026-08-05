import { Circle, Engine, Pen, Text, Watermark } from 'tscratch';
import './events/controls.ts';
import startGame from './logic/start-game.ts';
import { pen, text } from './sprites/main.ts';
import { conn, baseRadius } from './global.ts';

const engine = Engine.init();
engine.setScene('lobby');

conn.on('startGame', startGame);

// Rendering loop
engine.setLoop('game', () => {

    // Clear the canvas before rendering
    pen.eraseAll();

    // Draw each sprite (relative to the player)
    const playerState = conn.getRoomPlayerState();
    const coeff = baseRadius / playerState.radius; // For relative scaling

    for (const state of conn.roomClients.values()) {
        if (!state.alive || JSON.stringify(playerState) === JSON.stringify(state)) continue;
        
        Pen.drawSprite(Circle, {
            x: coeff * (state.x - playerState.x), // Relative positioning
            y: coeff * (state.y - playerState.y),
            radius: coeff * state.radius,
            color: state.color
        });
    }

    // Draw
    if (playerState.alive) {
        Pen.drawSprite(Circle, {
            radius: baseRadius,
            color: playerState.color
        });
    }

    // Render the kill count
    text.setContent(`Kills: ${playerState.kills}`);

    // Show a death message if eliminated
    if (!playerState.alive) {
        Pen.drawSprite(Text, {
            content: 'You have been eliminated...',
            fontSize: 32
        });
    }
});