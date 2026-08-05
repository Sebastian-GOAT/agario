import { Multiplayer, TSCMath } from 'tscratch';
import type { PlayerState } from './state.ts';

export const speed = 7;
export const color = `rgb(${TSCMath.pickRandom(0, 175)}, ${TSCMath.pickRandom(0, 175)}, ${TSCMath.pickRandom(0, 175)})`;
export const conn = new Multiplayer<PlayerState>('localhost:3000');