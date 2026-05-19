import type {
  InputHTMLAttributes,
  TextareaHTMLAttributes,
} from 'react';

type TextFieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  labelText: string;
  unit?: string;
  type?: string;
  containerStyle?: React.CSSProperties;
};

export function TextField({
  labelText,
  unit,
  containerStyle,
  className,
  ...rest
}: TextFieldProps) {
  return (
    <div className="ds-field" style={containerStyle}>
      <span className="ds-field__label">{labelText}</span>
      <div className="ds-field__wrap">
        <input
          className={['ds-field__input', className].filter(Boolean).join(' ')}
          {...rest}
        />
        {unit && <span className="ds-field__suffix">{unit}</span>}
      </div>
    </div>
  );
}

type MultilineTextFieldProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  labelText?: string;
  containerStyle?: React.CSSProperties;
};

export function MultilineTextField({
  labelText,
  containerStyle,
  className,
  placeholder,
  ...rest
}: MultilineTextFieldProps) {
  return (
    <div className="ds-field" style={containerStyle}>
      {labelText && <span className="ds-field__label">{labelText}</span>}
      <textarea
        className={['ds-field__textarea', className].filter(Boolean).join(' ')}
        placeholder={placeholder ?? labelText ?? ''}
        {...rest}
      />
    </div>
  );
}
