import { Circle, Pen, Text, Watermark } from 'tscratch';

export const pen = new Pen;
export const player = new Circle({ hidden: true, scene: 'game' });
export const text = new Watermark({ content: '', scene: '*' });
export const deathText = new Text({ content: 'You have been eliminated...', fontSize: 32, hidden: true, scene: 'game' });