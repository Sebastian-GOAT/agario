import { Circle, Engine, Pen } from 'tscratch';
import './events/controls.ts';
import startGame from './logic/start-game.ts';
import { pen } from './sprites/main.ts';
import { conn } from './global.ts';

const engine = Engine.init();
engine.setScene('lobby');

conn.on('startGame', startGame);

// Rendering loop
engine.setLoop('game', () => {

    pen.eraseAll();

    for (const state of conn.roomClients.values()) {
        Pen.drawSprite(Circle, {
            x: state.x,
            y: state.y,
            radius: state.radius,
            color: state.color
        });
    }
});