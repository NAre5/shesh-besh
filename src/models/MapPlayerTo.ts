import { Player } from './enums/Player';

export type MapPlayerTo<T> = { [key in Player]: T };
