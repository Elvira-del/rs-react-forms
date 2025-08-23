import { useState } from 'react';
import { createPortal } from 'react-dom';
import { ModalShell } from './components/ModalShell/ModalShell';
import { UncontrolledForm } from './components/UncontrolledForm/UncontrolledForm';
import { ReactForm } from './components/ReactForm/ReactForm';
import './App.css';

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
    <main>
      <button
        type="button"
        onClick={handleUncontrolledFormOpen}
        data-testid="uncontrolled-form-button"
      >
        Open uncontrolled form
      </button>
      <button
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
    </main>
  );
}

export default App;
