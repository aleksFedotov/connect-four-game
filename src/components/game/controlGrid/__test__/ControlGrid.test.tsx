import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { Provider } from 'react-redux';
import { store } from '../../../../store/store';
import { changeTurn } from '../../../../store/gameSlice';
import ControlGrid from '../ControlGrid';
import { useAppDispatch } from '../../../../store/hooks';
import { renderWithProviders } from '../../../../helpers/test-utils';
import { setupStore } from '../../../../store/store';
import { maximizePlay } from '../../../../helpers/aiMove';
import { act } from 'react-dom/test-utils';

const renderComponent = () => {
  return render(
    <Provider store={store}>
      <ControlGrid />
    </Provider>
  );
};

jest.mock('../../../../store/hooks', () => ({
  ...jest.requireActual('../../../../store/hooks'),
  useAppDispatch: jest.fn(),
}));
jest.mock('../../../../helpers/aiMove', () => ({
  maximizePlay: jest.fn(),
}));

const maximizePlayMock = maximizePlay as jest.Mock;

describe('Control Grid component testing', () => {
  test('should render component', () => {
    renderComponent();
    const control = screen.getByTestId('control');
    expect(control).toBeInTheDocument();
  });

  test('should render 7 columns', () => {
    renderComponent();
    const columns = screen.getAllByTestId(/column/i);
    expect(columns).toHaveLength(7);
  });

  test('should call dispatch after clicking on one of columns', () => {
    const dispatch = jest.fn();
    // @ts-ignore
    useAppDispatch.mockReturnValue(dispatch);
    renderComponent();
    const column = screen.getByTestId(/column0/i);
    fireEvent.click(column);
    expect(dispatch).toBeCalled();
  });

  test('pointer should move on mouse enter column', () => {
    renderComponent();
    const column = screen.getByTestId(/column3/i);
    fireEvent.mouseEnter(column);
    const pointer = screen.getByTestId('pointer');
    expect(pointer).toHaveStyle('grid-area: d');
  });

  test('color of pointer should be red initaly', () => {
    renderComponent();

    const pointerColor = screen.getByTestId('color-red');
    expect(pointerColor).toBeInTheDocument();
  });
  test('color of pointer should be yellow after changing turn', async () => {
    renderComponent();
    await waitFor(() => {
      store.dispatch(changeTurn());
    });
    const pointerColor = screen.getByTestId('color-yellow');
    expect(pointerColor).toBeInTheDocument();
    await waitFor(() => {
      store.dispatch(changeTurn());
    });
  });

  test('should call dispatch on cpu turn', async () => {
    const dispatch = jest.fn();
    // @ts-ignore
    useAppDispatch.mockReturnValue(dispatch);
    const preLoadedstore = setupStore();
    const { game } = preLoadedstore.getState();
    const { store } = renderWithProviders(<ControlGrid />, {
      preloadedState: {
        game: {
          ...game,
          gameMode: 'CPUvP',
          turn: 'red',
          p2: { name: 'CPU', color: 'yellow', score: 0 },
        },
      },
    });
    await act(() => {
      store.dispatch(changeTurn());
    });

    maximizePlayMock.mockImplementation(() => [2, 12]);

    await waitFor(() => {
      expect(maximizePlayMock).toBeCalled();
    });
    await waitFor(() => {
      expect(dispatch).toBeCalled();
    });
  });
});
