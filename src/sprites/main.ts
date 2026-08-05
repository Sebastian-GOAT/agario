import { Circle, Pen, Watermark } from 'tscratch';

export const pen = new Pen;
export const player = new Circle({ hidden: true, scene: 'game' });
export const text = new Watermark({ content: '', scene: '*' });