export type counter = {
  color: string | null;
  isWinning: boolean;
};

export const createGrid = () => {
  const grid: counter[][] = [...Array(6)].map(() =>
    Array(7).fill({ color: null, isWinning: false })
  );

  return grid;
};
