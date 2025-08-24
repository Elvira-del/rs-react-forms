import { describe, expect, test, vi } from 'vitest';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ModalShell } from '../components/ModalShell/ModalShell';
import App from '../App';

describe('ModalShell', () => {
  test('should open the modal when triggered and close it when requested', async () => {
    const user = userEvent.setup();
    const handleClose = vi.fn();

    const { getByTestId } = render(
      <ModalShell id="test-modal" open={true} onClose={handleClose} />
    );

    const modal = getByTestId('modal-shell');

    expect(modal).toBeInTheDocument();

    const closeButton = getByTestId('close-button');

    await user.click(closeButton);
    expect(handleClose).toHaveBeenCalledOnce();
  });

  test('should close the modal when Escape key is pressed', async () => {
    const user = userEvent.setup();
    const handleClose = vi.fn();

    const { getByTestId } = render(
      <ModalShell id="test-modal" open={true} onClose={handleClose} />
    );

    const modal = getByTestId('modal-shell');

    expect(modal).toBeInTheDocument();

    await user.keyboard('{Escape}');
    expect(handleClose).toHaveBeenCalledOnce();
  });

  test('should close the modal when click on outside', async () => {
    const user = userEvent.setup();
    const handleClose = vi.fn();

    const { getByTestId } = render(
      <ModalShell id="test-modal" open={true} onClose={handleClose} />
    );

    const modal = getByTestId('modal-shell');
    expect(modal).toBeInTheDocument();

    const backdrop = getByTestId('modal-backdrop');
    await user.click(backdrop);
    expect(handleClose).toHaveBeenCalledOnce();
  });

  test('should render modal in portal', async () => {
    const user = userEvent.setup();

    const { getByTestId, queryByTestId } = render(<App />);

    const uncontrolledButton = getByTestId('uncontrolled-form-button');
    const controlledButton = getByTestId('react-form-button');

    await user.click(uncontrolledButton);
    expect(document.body).toContainElement(queryByTestId('modal-shell'));

    await user.click(controlledButton);
    expect(document.body).toContainElement(queryByTestId('modal-shell'));
  });
});
