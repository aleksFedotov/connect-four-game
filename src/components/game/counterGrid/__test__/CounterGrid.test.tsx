import { screen, render } from '@testing-library/react';

import CounterGrid from '../CounterGrid';
import { Provider } from 'react-redux';
import { store } from '../../../../store/store';
import {
  changeTurn,
  makeMove,
  placeCounter,
} from '../../../../store/gameSlice';

const renderComponent = () => {
  return render(
    <Provider store={store}>
      <CounterGrid />
    </Provider>
  );
};

describe('Counter grid component testing', () => {
  test('should render component', () => {
    renderComponent();
    const counterGrid = screen.getByTestId('counterGrid');
    expect(counterGrid).toBeInTheDocument();
  });
  test('should render right amount of red counters', () => {
    store.dispatch(placeCounter(0));
    store.dispatch(placeCounter(1));
    store.dispatch(placeCounter(2));
    renderComponent();

    const redCounters = screen.getAllByTestId('red');
    expect(redCounters).toHaveLength(3);
  });
  test('should render right amount of yellow counters', () => {
    store.dispatch(changeTurn());
    store.dispatch(placeCounter(6));
    store.dispatch(placeCounter(6));
    store.dispatch(placeCounter(6));
    store.dispatch(placeCounter(6));
    renderComponent();
    const redCounters = screen.getAllByTestId('yellow');
    expect(redCounters).toHaveLength(4);
  });
  test('should render right amount of empty counters', () => {
    renderComponent();
    const redCounters = screen.getAllByTestId('empty');
    expect(redCounters).toHaveLength(35);
  });
});
