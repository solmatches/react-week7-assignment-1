import { fireEvent, render } from '@testing-library/react';

import LoginForm from './LoginForm';

describe('LoginForm', () => {
  const handleSubmit = jest.fn();
  const handleChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderLoginForm = ({ email, password }) => render(
    <LoginForm onSubmit={handleSubmit} onChange={handleChange} fields={{ email, password }} />,
  );

  it('renders input controls and listens change events', () => {
    const email = 'test@test';
    const password = '1234';

    const { getByLabelText } = renderLoginForm({ email, password });

    const controls = [
      {
        label: 'E-mail', name: 'email', origin: email, value: 'tester@example.com',
      },
      {
        label: 'Password', name: 'password', origin: password, value: 'test',
      },
    ];

    controls.forEach(({
      label, name, origin, value,
    }) => {
      const input = getByLabelText(label);

      expect(input.value).toBe(origin);

      fireEvent.change(getByLabelText(label), { target: { value } });

      expect(handleChange).toBeCalledWith({ name, value });
    });
  });

  it('renders "Log In" button', () => {
    const { getByText } = renderLoginForm({});

    fireEvent.click(getByText('Log In'));

    expect(handleSubmit).toBeCalled();
  });
});
