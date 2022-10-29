import { checkForWin } from '../checkForWin';
import { counter } from '../helpers';

const winGrid: counter[][] = [
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  ['red', null, null, null, null, null, null],
  ['red', null, null, null, null, null, null],
  ['red', null, null, null, null, null, null],
  ['red', null, null, null, null, null, null],
];
const notwinGrid: counter[][] = [
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  ['red', null, null, null, null, null, null],
  ['red', null, null, null, null, null, null],
  ['red', null, null, null, null, null, null],
];

describe('checkForWin testting', () => {
  test('should return false for not win grid', () => {
    const isWin = checkForWin(0, 3, notwinGrid, 'red');
    expect(isWin).toBeFalsy();
  });

  test('should return winCombo for win grid', () => {
    const win = checkForWin(3, 0, winGrid, 'red');

    // @ts-ignore
    const { winner, segments } = win;

    expect(winner).toBe('red');
    expect(segments[0][0]).toBe(2);
    expect(segments[0][1]).toBe(0);
    expect(segments[1][0]).toBe(3);
    expect(segments[1][1]).toBe(0);
    expect(segments[2][0]).toBe(4);
    expect(segments[2][1]).toBe(0);
    expect(segments[3][0]).toBe(5);
    expect(segments[3][1]).toBe(0);
  });
});
