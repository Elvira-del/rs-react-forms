import { useState } from 'react';
import { createPortal } from 'react-dom';
import { ModalShell } from './components/ModalShell/ModalShell';
import './App.css';
import { UncontrolledForm } from './components/UncontrolledForm/UncontrolledForm';

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeForm, setActiveForm] = useState<null | 'uncontrolled' | 'react'>(
    null
  );

  const handleUncontrolledFormOpen = () => {
    setIsOpen(true);
    setActiveForm('uncontrolled');
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
        onClick={() => setIsOpen(true)}
        data-testid="react-form-button"
      >
        Open React form
      </button>

      {isOpen &&
        createPortal(
          <ModalShell id="shared-modal" open={isOpen} onClose={handleClose}>
            {activeForm === 'uncontrolled' ? (
              <UncontrolledForm />
            ) : (
              <div>React Form</div>
            )}
          </ModalShell>,
          document.body
        )}
    </main>
  );
}

export default App;
