import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { formSchema, type FormSchemaType } from '../../utils/schema';

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
const errorBase = 'border-red-300 focus:border-red-400 focus:ring-red-100';

export const ReactForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
  });
  const errorClass = (hasError: boolean) => (hasError ? errorBase : '');

  const handleSubmitForm: SubmitHandler<FormSchemaType> = (data) => {
    console.log(data);
  };

  return (
    <form
      id="reactForm"
      className="space-y-5"
      action="#"
      onSubmit={handleSubmit(handleSubmitForm)}
      noValidate
    >
      <div className="grid gap-2 sm:grid-cols-2">
        <div>
          <label className={labelBase} htmlFor="name" data-testid="name-label">
            Name <span className="text-red-600">*</span>
          </label>
          <input
            id="name"
            className={`${inputBase} ${errorClass(Boolean(errors.name))}`}
            type="text"
            placeholder="John"
            aria-invalid={Boolean(errors.name)}
            aria-describedby="name-error"
            {...register('name')}
            data-testid="name-input"
          />
          <p
            id="name-error"
            aria-live="polite"
            className="mt-1 min-h-5 text-xs text-red-600"
          >
            {errors.name?.message ?? ''}
          </p>
        </div>

        <div>
          <label className={labelBase} htmlFor="age" data-testid="age-label">
            Age <span className="text-red-600">*</span>
          </label>
          <input
            id="age"
            className={`${inputBase} ${errorClass(Boolean(errors.age))}`}
            type="number"
            inputMode="numeric"
            min={0}
            step={1}
            placeholder="25"
            aria-invalid={Boolean(errors.age)}
            aria-describedby="age-error"
            {...register('age', { valueAsNumber: true })}
            data-testid="age-input"
          />
          <p
            id="age-error"
            aria-live="polite"
            className="mt-1 min-h-5 text-xs text-red-600"
          >
            {errors.age?.message ?? ''}
          </p>
        </div>

        <div>
          <label
            className={labelBase}
            htmlFor="email"
            data-testid="email-label"
          >
            Email <span className="text-red-600">*</span>
          </label>
          <input
            id="email"
            className={`${inputBase} ${errorClass(Boolean(errors.email))}`}
            type="email"
            placeholder="name@example.com"
            aria-invalid={Boolean(errors.email)}
            aria-describedby="email-error"
            {...register('email')}
            data-testid="email-input"
          />
          <p
            id="email-error"
            aria-live="polite"
            className="mt-1 min-h-5 text-xs text-red-600"
          >
            {errors.email?.message ?? ''}
          </p>
        </div>

        <div>
          <label
            className={labelBase}
            htmlFor="password"
            data-testid="password-label"
          >
            Password <span className="text-red-600">*</span>
          </label>
          <input
            id="password"
            className={`${inputBase} ${errorClass(Boolean(errors.password))}`}
            type="password"
            placeholder="••••••••"
            aria-invalid={Boolean(errors.password)}
            aria-describedby="password-error"
            {...register('password')}
            data-testid="password-input"
          />
          <p
            id="password-error"
            aria-live="polite"
            className="mt-1 min-h-5 text-xs text-red-600"
          >
            {errors.password?.message ?? ''}
          </p>
        </div>

        <div>
          <label
            className={labelBase}
            htmlFor="confirm"
            data-testid="confirm-password-label"
          >
            Confirm password <span className="text-red-600">*</span>
          </label>
          <input
            id="confirm"
            className={`${inputBase} ${errorClass(Boolean(errors.confirm))}`}
            type="password"
            placeholder="••••••••"
            aria-invalid={Boolean(errors.confirm)}
            aria-describedby="confirm-error"
            {...register('confirm')}
            data-testid="confirm-password-input"
          />
          <p
            id="confirm-error"
            aria-live="polite"
            className="mt-1 min-h-5 text-xs text-red-600"
          >
            {errors.confirm?.message ?? ''}
          </p>
        </div>

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
                    id={`gender-${gender.toLowerCase()}`}
                    className="size-4 rounded-full border-neutral-300 text-neutral-900 focus:ring-neutral-300"
                    type="radio"
                    value={gender}
                    aria-invalid={Boolean(errors.gender)}
                    {...register('gender')}
                    data-testid={`gender-${gender.toLowerCase()}-input`}
                  />
                  <span>{gender}</span>
                </label>
              ))}
            </div>
          </fieldset>
          <p
            id="gender-error"
            aria-live="polite"
            className="mt-1 min-h-5 text-xs text-red-600"
          >
            {errors.gender?.message ?? ''}
          </p>
        </div>

        <div className="sm:col-span-2">
          <label
            className={labelBase}
            htmlFor="country"
            data-testid="country-label"
          >
            Country <span className="text-red-600">*</span>
          </label>
          <input
            id="country"
            className={`${inputBase} ${errorClass(Boolean(errors.country))}`}
            list="countries"
            placeholder="Start typing…"
            aria-invalid={Boolean(errors.country)}
            aria-describedby="country-error"
            {...register('country')}
            data-testid="country-input"
          />
          <datalist id="countries">
            {countries.map((country) => (
              <option key={country} value={country} />
            ))}
          </datalist>
          <p
            id="country-error"
            aria-live="polite"
            className="mt-1 min-h-5 text-xs text-red-600"
          >
            {errors.country?.message ?? ''}
          </p>
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
            aria-invalid={Boolean(errors.picture)}
            aria-describedby="picture-error"
            {...register('picture')}
            data-testid="picture-input"
          />
          <p
            id="picture-error"
            aria-live="polite"
            className="mt-1 min-h-5 text-xs text-red-600"
          >
            {errors.picture?.message ?? ''}
          </p>
        </div>

        <div className="sm:col-span-2">
          <label
            className="inline-flex items-center gap-3"
            htmlFor="terms"
            data-testid="terms-label"
          >
            <input
              id="terms"
              className={`size-4 rounded border-neutral-300 text-neutral-900 focus:ring-neutral-300 ${errors.terms ? 'ring-2 ring-red-200' : ''}`}
              type="checkbox"
              aria-invalid={Boolean(errors.terms)}
              aria-describedby="terms-error"
              {...register('terms')}
              data-testid="terms-input"
            />
            <span className="text-sm text-neutral-700">
              I accept the{' '}
              <a href="#" className="underline">
                Terms and Conditions
              </a>
            </span>
          </label>
          <p
            id="terms-error"
            aria-live="polite"
            className="mt-1 min-h-5 text-xs text-red-600"
          >
            {errors.terms?.message ?? ''}
          </p>
        </div>
      </div>
    </form>
  );
};
