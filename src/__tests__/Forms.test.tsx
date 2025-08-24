import { describe, test } from 'vitest';
import { render } from '@testing-library/react';
import { UncontrolledForm } from '../components/UncontrolledForm/UncontrolledForm';
import { ReactForm } from '../components/ReactForm/ReactForm';

describe('Forms', () => {
  const testIds = [
    'name-label',
    'name-input',
    'age-label',
    'age-input',
    'email-label',
    'email-input',
    'password-label',
    'password-input',
    'confirm-password-label',
    'confirm-password-input',
    'gender-male-label',
    'gender-female-label',
    'gender-other-label',
    'gender-male-input',
    'gender-female-input',
    'gender-other-input',
    'country-label',
    'country-input',
    'picture-label',
    'picture-input',
    'terms-label',
    'terms-input',
  ];

  test('uncontrolled form renders with all required fields', () => {
    const { getByTestId } = render(<UncontrolledForm />);

    testIds.forEach((id) => {
      expect(getByTestId(id)).toBeInTheDocument();
    });
  });

  test('react-hook form renders with all required fields', () => {
    const { getByTestId } = render(<ReactForm />);

    testIds.forEach((id) => {
      expect(getByTestId(id)).toBeInTheDocument();
    });
  });
});
