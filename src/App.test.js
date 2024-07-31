import { render, screen } from '@testing-library/react';
import App from './App';
import Login from './Login/login';

test('renders learn react link', () => {
  render(<Login />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
