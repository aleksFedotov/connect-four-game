export type counter = string | null;

export const createGrid = () => {
  const grid: counter[][] = [...Array(6)].map(() => Array(7).fill(null));

  return grid;
};
