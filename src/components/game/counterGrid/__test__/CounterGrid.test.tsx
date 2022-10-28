import { screen, render } from '@testing-library/react';

import CounterGrid from '../CounterGrid';
import { Provider } from 'react-redux';
import { store } from '../../../../store/store';

const testGrid = [
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, 'yellow'],
  [null, null, null, null, null, null, 'yellow'],
  [null, null, null, null, null, null, 'yellow'],
  ['red', 'red', 'red', null, null, null, 'yellow'],
];

const renderComponent = () => {
  return render(
    <Provider store={store}>
      <CounterGrid grid={testGrid} />
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
    renderComponent();
    const redCounters = screen.getAllByTestId('red');
    expect(redCounters).toHaveLength(3);
  });
  test('should render right amount of yellow counters', () => {
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
