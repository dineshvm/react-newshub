import { render, cleanup } from '@testing-library/react';
import App from './App';


afterEach(cleanup);

describe('Testing News Hub App Component', () => {
  test('renders app with spinner', () => {
    const { queryByTestId } = render(<App />);
    const spinnerEl = queryByTestId('spinner');
    expect(spinnerEl).toBeInTheDocument();
  });
});
