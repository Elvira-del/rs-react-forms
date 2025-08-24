import { useForm, type SubmitHandler } from 'react-hook-form';

const countries = [
  'United Kingdom',
  'France',
  'Germany',
  'Spain',
  'Italy',
  'Poland',
  'Portugal',
  'Turkey',
  'United States',
  'Canada',
];

const inputBase =
  'block w-full rounded-xl border border-neutral-200 bg-white px-3.5 py-2.5 text-sm/6 text-neutral-900 shadow-sm outline-none transition focus:border-neutral-400 focus:ring-4 focus:ring-neutral-200 disabled:cursor-not-allowed disabled:opacity-60 placeholder:text-neutral-400';

const labelBase = 'mb-1.5 block text-sm/6 font-medium text-neutral-700';

type Inputs = {
  name: string;
  age: number;
  email: string;
  password: string;
  confirm: string;
  country: string;
  picture: FileList;
  terms: boolean;
};

export const ReactForm = () => {
  const { register, handleSubmit } = useForm<Inputs>();

  const handleSubmitForm: SubmitHandler<Inputs> = (data) => {
    console.log(data);
  };

  return (
    <form
      id="reactForm"
      className="space-y-5"
      action="#"
      onSubmit={handleSubmit(handleSubmitForm)}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <label className={labelBase} htmlFor="name" data-testid="name-label">
          <span>
            Name <span className="text-red-600">*</span>
          </span>
          <input
            id="name"
            className={inputBase}
            type="text"
            placeholder="John"
            {...register('name', { required: true })}
            data-testid="name-input"
          />
        </label>

        <label className={labelBase} htmlFor="age" data-testid="age-label">
          <span>
            Age <span className="text-red-600">*</span>
          </span>
          <input
            id="age"
            className={inputBase}
            type="number"
            inputMode="numeric"
            min={0}
            step={1}
            placeholder="25"
            {...register('age', { required: true, valueAsNumber: true })}
            data-testid="age-input"
          />
        </label>

        <label className={labelBase} htmlFor="email" data-testid="email-label">
          <span>
            Email <span className="text-red-600">*</span>
          </span>
          <input
            id="email"
            className={inputBase}
            type="email"
            placeholder="name@example.com"
            {...register('email', { required: true })}
            data-testid="email-input"
          />
        </label>

        <label
          className={labelBase}
          htmlFor="password"
          data-testid="password-label"
        >
          <span>
            Password <span className="text-red-600">*</span>
          </span>
          <input
            id="password"
            className={inputBase}
            type="password"
            placeholder="••••••••"
            {...register('password', { required: true })}
            data-testid="password-input"
          />
        </label>

        <label
          className={labelBase}
          htmlFor="confirm"
          data-testid="confirm-password-label"
        >
          <span>
            Confirm password <span className="text-red-600">*</span>
          </span>
          <input
            id="confirm"
            className={inputBase}
            type="password"
            placeholder="••••••••"
            {...register('confirm', { required: true })}
            data-testid="confirm-password-input"
          />
        </label>

        <div className="sm:col-span-2">
          <fieldset>
            <legend className={labelBase}>
              Gender <span className="text-red-600">*</span>
            </legend>
            <div className="flex flex-wrap gap-3">
              {['Female', 'Male', 'Other'].map((gender, idx) => (
                <label
                  key={gender}
                  className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3 py-1.5 text-sm text-neutral-700 shadow-sm"
                  data-testid={`gender-${gender.toLowerCase()}-label`}
                >
                  <input
                    type="radio"
                    name="gender"
                    defaultChecked={idx === 0}
                    className="size-4 rounded-full border-neutral-300 text-neutral-900 focus:ring-neutral-300"
                    data-testid={`gender-${gender.toLowerCase()}-input`}
                  />
                  <span>{gender}</span>
                </label>
              ))}
            </div>
          </fieldset>
        </div>

        <div className="sm:col-span-2">
          <label
            className={labelBase}
            htmlFor="country"
            data-testid="country-label"
          >
            <span>
              Country <span className="text-red-600">*</span>
            </span>
            <input
              id="country"
              className={inputBase}
              list="countries"
              placeholder="Start typing…"
              {...register('country', { required: true })}
              data-testid="country-input"
            />
            <datalist id="countries">
              {countries.map((country) => (
                <option key={country} value={country} />
              ))}
            </datalist>
          </label>
        </div>

        <div className="sm:col-span-2">
          <label
            className={labelBase}
            htmlFor="picture"
            data-testid="picture-label"
          >
            Upload picture
          </label>
          <label
            className="group flex items-center justify-between gap-3 rounded-xl border border-dashed border-neutral-300 bg-neutral-50 px-4 py-3 text-sm text-neutral-600 transition hover:border-neutral-400"
            htmlFor="picture"
          >
            <span>Choose an image file (PNG, JPG)</span>
            <span className="rounded-lg border border-neutral-200 bg-white px-2.5 py-1 shadow-sm">
              Upload
            </span>
          </label>
          <input
            id="picture"
            className="sr-only"
            type="file"
            accept="image/*"
            {...register('picture')}
            data-testid="picture-input"
          />
        </div>

        <div className="sm:col-span-2">
          <label
            className="inline-flex items-center gap-3"
            htmlFor="terms"
            data-testid="terms-label"
          >
            <input
              id="terms"
              className="size-4 rounded border-neutral-300 text-neutral-900 focus:ring-neutral-300"
              type="checkbox"
              {...register('terms', { required: true })}
              data-testid="terms-input"
            />
            <span className="text-sm text-neutral-700">
              I accept the{' '}
              <a href="#" className="underline">
                Terms and Conditions
              </a>
            </span>
          </label>
        </div>
      </div>
    </form>
  );
};
