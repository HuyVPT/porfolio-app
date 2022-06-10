import { useRef, useImperativeHandle, forwardRef, useState, useEffect } from 'react';
import FormError from '@/models/error-message';
import * as Validators from '@/validators';
import Icon from '@/components/icon/icon';
import './input-field.scss';

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

function InputField(props: InputProps, ref: any) {
  const inputFieldRef = useRef<HTMLInputElement>(null);
  const [inValid, setInValid] = useState(props.validate && !!props.validate(props.value as string));
  const [value, setValue] = useState<string>(props.value as string);

  useImperativeHandle(ref, () => ({
    isValid() {
      return !inValid;
    },
    focus() {
      inputFieldRef.current && (inputFieldRef.current as HTMLElement).focus();
    },
    getInputValue() {
      return value;
    },
    reset() {
      setValue('');
    },
  }));

  useEffect(() => {
    return () => {
      console.log('temp');
    };
  }, []);

  const valueChangeHandler = (controlValue: string) => {
    console.log('controlValue', controlValue);

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

  useEffect(() => {
    if (props.validate) {
      const fieldError: FormError | null = props.validate((props.value || '') as string);
      setInValid(!!fieldError);
    }
  }, [props]);
  return (
    <>
      <div className={'input-field-container ' + (props.className || '')}>
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
          onChange={(e) => {
            valueChangeHandler(e.target.value);
          }}
        />
        {props.required && <Icon type="fas" name="asterisk" />}
      </div>
    </>
  );
}

export default forwardRef(InputField);
