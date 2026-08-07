import { Multiplayer, TSCMath } from 'tscratch';
import type { PlayerState } from './state.ts';

export const speed = 7;
export const color = `rgb(${TSCMath.pickRandom(0, 175)}, ${TSCMath.pickRandom(0, 175)}, ${TSCMath.pickRandom(0, 175)})`;
export const conn = new Multiplayer<PlayerState>('https://agario-nfin.onrender.com');
export const baseRadius = 130;