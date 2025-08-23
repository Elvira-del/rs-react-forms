import { useState } from 'react';
import { createPortal } from 'react-dom';
import { ModalShell } from './components/ModalShell/ModalShell';
import { UncontrolledForm } from './components/UncontrolledForm/UncontrolledForm';
import { ReactForm } from './components/ReactForm/ReactForm';
import './App.css';

const buttonBase =
  'rounded-xl border border-neutral-200 bg-white px-4 py-2.5 text-sm font-medium text-neutral-700 shadow-sm transition focus-visible:ring-4 focus-visible:ring-neutral-300 focus-visible:ring-offset-2 focus-visible:ring-offset-white hover:border-neutral-300 hover:shadow active:scale-[.98] active:shadow motion-reduce:transition-none motion-reduce:transform-none';

type FormType = 'uncontrolled' | 'react';

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeForm, setActiveForm] = useState<null | FormType>(null);

  const handleUncontrolledFormOpen = () => {
    setIsOpen(true);
    setActiveForm('uncontrolled');
  };

  const handleReactFormOpen = () => {
    setIsOpen(true);
    setActiveForm('react');
  };

  const handleClose = () => {
    setIsOpen(false);
    setActiveForm(null);
  };

  return (
    <main className="min-h-dvh flex place-items-center  text-neutral-900">
      <div className="flex gap-3">
        <button
          className={buttonBase}
          type="button"
          onClick={handleUncontrolledFormOpen}
          data-testid="uncontrolled-form-button"
        >
          Open uncontrolled form
        </button>
        <button
          className={buttonBase}
          type="button"
          onClick={handleReactFormOpen}
          data-testid="react-form-button"
        >
          Open React form
        </button>

        {isOpen &&
          createPortal(
            <ModalShell
              id="shared-modal"
              open={isOpen}
              onClose={handleClose}
              formId={
                activeForm === 'uncontrolled' ? 'uncontrolledForm' : 'reactForm'
              }
            >
              {activeForm === 'uncontrolled' ? (
                <UncontrolledForm />
              ) : (
                <ReactForm />
              )}
            </ModalShell>,
            document.body
          )}
      </div>
    </main>
  );
}

export default App;
