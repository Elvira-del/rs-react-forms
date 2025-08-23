import { useState } from 'react';
import { createPortal } from 'react-dom';
import { ModalShell } from './components/ModalShell/ModalShell';
import './App.css';

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <main>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
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
          <ModalShell
            id="shared-modal"
            open={isOpen}
            onClose={() => setIsOpen(false)}
          />,
          document.body
        )}
    </main>
  );
}

export default App;
