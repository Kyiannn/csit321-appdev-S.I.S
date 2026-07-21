import React, { useState } from 'react';

interface InputFieldProps {
  id: string;
  label?: string;
  type?: 'text' | 'email' | 'password' | 'textarea';
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  rows?: number;
  showCharCount?: boolean;
  maxLength?: number;
  required?: boolean;
  validate?: (value: string) => string | null;
  className?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  id,
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  disabled = false,
  rows = 4,
  showCharCount = false,
  maxLength,
  required = false,
  validate,
  className = '',
}) => {
  const [error, setError] = useState<string | null>(null);
  const [touched, setTouched] = useState(false);

  const handleBlur = () => {
    setTouched(true);
    if (validate) {
      const errorMessage = validate(value);
      setError(errorMessage);
    }
  };

  const handleChange = (newValue: string) => {
    onChange(newValue);
    if (touched && validate) {
      const errorMessage = validate(newValue);
      setError(errorMessage);
    }
  };

  const baseClasses =
    'w-full px-4 py-3 border-2 rounded-xl text-base transition-all duration-300 focus:outline-none focus:bg-white placeholder:text-gray-400';
  const stateClasses = error && touched
    ? 'border-red-400 focus:border-red-500 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.1)] bg-red-50'
    : 'border-gray-200 focus:border-purple-500 focus:shadow-[0_0_0_3px_rgba(102,126,234,0.1)] bg-gray-50';
  const disabledClasses = disabled ? 'cursor-default opacity-75' : '';

  const labelClasses = required 
    ? 'block text-sm font-semibold text-gray-700 after:content-["*"] after:text-red-500 after:ml-1'
    : 'block text-sm font-semibold text-gray-700';

  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && (
        <label htmlFor={id} className={labelClasses}>
          {label}
        </label>
      )}
      {type === 'textarea' ? (
        <textarea
          id={id}
          className={`${baseClasses} ${stateClasses} ${disabledClasses} resize-y min-h-[100px]`}
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          onBlur={handleBlur}
          placeholder={placeholder}
          disabled={disabled}
          rows={rows}
          maxLength={maxLength}
        />
      ) : (
        <input
          id={id}
          type={type}
          className={`${baseClasses} ${stateClasses} ${disabledClasses}`}
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          onBlur={handleBlur}
          placeholder={placeholder}
          disabled={disabled}
          maxLength={maxLength}
        />
      )}
      {error && touched && (
        <p className="text-xs text-red-500 mt-1">{error}</p>
      )}
      {showCharCount && maxLength && (
        <div className="text-xs text-gray-400 text-right">
          {value.length} / {maxLength} characters
        </div>
      )}
    </div>
  );
};

export default InputField;