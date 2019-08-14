import Position from '../Position/Position';
// eslint-disable-next-line import/prefer-default-export
export enum DiskType{empty='empty', light='light', dark='dark'}
export interface DiskCore{
    position: Position;
    type?: DiskType;
}
