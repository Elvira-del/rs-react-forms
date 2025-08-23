import { useEffect } from 'react';

type ModalShellProps = {
  id?: string;
  open: boolean;
  title?: string;
  description?: string;
  children: React.ReactNode;
  onClose: () => void;
  formId: string;
};

export const ModalShell = ({
  id,
  open,
  title = 'Modal Title',
  description = 'Modal Description',
  children,
  onClose,
  formId,
}: ModalShellProps) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  if (!open) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-50 bg-neutral-950/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
        data-testid="modal-backdrop"
      >
        <div
          className="absolute inset-0 flex items-end justify-center p-4 sm:items-center sm:p-6"
          data-testid="modal-shell"
        >
          <div
            className="w-full sm:max-w-md rounded-2xl border border-neutral-200 bg-white shadow-xl ring-1 ring-black/5 transition focus:outline-none"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby={`${id}-title`}
            aria-describedby={`${id}-desc`}
          >
            <div className="flex items-start justify-between gap-4 border-b border-neutral-100 px-5 py-4">
              <div>
                <h2
                  id={`${id}-title`}
                  className="text-base font-semibold text-neutral-900"
                >
                  {title}
                </h2>
                {description && (
                  <p
                    id={`${id}-desc`}
                    className="mt-1 text-sm text-neutral-500"
                  >
                    {description}
                  </p>
                )}
              </div>

              <button
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-neutral-200 bg-white text-neutral-500 shadow-sm transition hover:text-neutral-700 hover:shadow"
                type="button"
                onClick={onClose}
                aria-label="Close modal"
                data-testid="close-button"
              >
                <svg
                  className="size-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    xmlns="http://www.w3.org/2000/svg"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289Z"
                    fill="currentColor"
                  />
                </svg>
              </button>
            </div>

            <div className="max-h-[min(70vh,640px)] overflow-y-auto px-5 py-4">
              {children}
            </div>

            <footer className="flex items-center justify-end gap-3 border-t border-neutral-100 px-5 py-4">
              <div className="flex items-center justify-between gap-2">
                <button
                  className="rounded-xl border border-neutral-200 bg-white px-4 py-2.5 text-sm font-medium text-neutral-500 shadow-sm transition hover:border-neutral-300"
                  type="button"
                  onClick={onClose}
                >
                  Cancel
                </button>
                <button
                  className="rounded-xl bg-neutral-900 px-4 py-2.5 text-sm font-medium  shadow-sm transition hover:bg-neutral-800 text-white"
                  type="submit"
                  form={formId}
                  data-testid="submit-button"
                >
                  Save changes
                </button>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </>
  );
};
