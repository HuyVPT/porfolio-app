import { useRef, useImperativeHandle, forwardRef, useState, useEffect } from 'react';
import FormError from '@/models/error-message';
import * as Validators from '@/validators';
import './input-field-hidden-border.scss';

interface InputProps {
  id: string;
  label?: string;
  value: string | FormError;
  name: string;
  className?: string;
  required?: boolean;
  maxlength?: number;
  placeholder?: string;
  readonly?: boolean;
  formId?: string;
  onChange?: (value: string) => void;
  onError?: (error: FormError) => void;
  validate?: (value: string) => FormError | null;
}

function InputFieldHiddenBorder(props: InputProps, ref: any) {
  const inputFieldRef = useRef<HTMLInputElement>(null);
  const [inValid, setInValid] = useState(props.validate && !!props.validate(props.value as string));
  const [value, setValue] = useState<string>(props.value as string);

  useImperativeHandle(ref, () => ({
    isValid() {
      return !inValid;
    },
    getInputValue() {
      return value;
    },
    reset() {
      setValue('');
    },
  }));

  useEffect(() => {
    // const fieldError: FormError | null = props.validate && props.validate((props.value || '') as string);
    // setInValid(!!fieldError);
    return () => {
      setValue('');
    };
  }, []);

  const valueChangeHandler = (controlValue: string) => {
    if (props.validate) {
      const fieldError: FormError | null = props.validate(controlValue);
      Validators.setErrorState(inputFieldRef.current as HTMLElement, !!fieldError);
      setInValid(!!fieldError);
      if (props.onError && fieldError) {
        props.onError(fieldError);
      }
    }
    setValue(controlValue);
  };

  const blurInputHandler = () => {
    if (!value) {
      setValue(props.value as string);
      props.onChange && props.onChange(props.value as string);
    } else {
      props.onChange && props.onChange(value);
    }
  };
  return (
    <>
      <div className={'input-field-hidden-border-container ' + (props.className || '')}>
        {props.label && <label htmlFor={props.id}>{props.label}</label>}
        <input
          ref={inputFieldRef}
          type="text"
          name={props.name}
          id={props.id}
          maxLength={props.maxlength}
          placeholder={props.placeholder || ''}
          value={value}
          readOnly={props.readonly}
          form={props.formId || ''}
          autoComplete="off"
          onChange={(e) => {
            valueChangeHandler(e.target.value);
          }}
          onBlur={blurInputHandler}
        />
      </div>
    </>
  );
}

export default forwardRef(InputFieldHiddenBorder);
