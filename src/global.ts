import { Multiplayer } from 'tscratch';
import type { PlayerState } from './state.ts';

export const speed = 7;
export const color = 'black';
export const conn = new Multiplayer<PlayerState>('localhost:3000');