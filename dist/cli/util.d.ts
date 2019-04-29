import colorette from 'colorette';
import { ITextStyle } from '../../types/cli-util';
export declare function applyStyle(msg: string, textStyle?: Partial<ITextStyle>): string;
export { colorette as style };
