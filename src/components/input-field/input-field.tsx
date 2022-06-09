import {
  ChangeEvent,
  useRef,
  useImperativeHandle,
  forwardRef,
  useState,
} from "react";
import FormError from "../../models/error-message";
import { setErrorState } from "../../validators";
import Icon from "../icon/icon";
import "./input-field.scss";

interface InputProps {
  id: string;
  label: string;
  value: string | FormError;
  name: string;
  className?: string;
  required?: boolean;
  maxlength?: number;
  placeholder?: string;
  readonly?: boolean;
  formId?: string;
  onChange: (value: string) => void;
  onError?: (error: FormError) => void;
  validate?: (value: string) => FormError | null;
}

function InputField(props: InputProps, ref: any) {
  const inputFieldRef = useRef<HTMLInputElement>(null);
  const [inValid, setInValid] = useState(false);

  useImperativeHandle(ref, () => ({
    inValid,
  }));

  const valueChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const controlValue: string = e.target.value;
    if (props.validate) {
      const fieldError: FormError | null = props.validate(controlValue);
      setErrorState(inputFieldRef.current as HTMLElement, !!fieldError);
      setInValid(!!fieldError);
      if (props.onError && fieldError) {
        props.onError(fieldError);
      }
    }
    props.onChange(controlValue);
  };
  return (
    <>
      <div className={"input-field-container " + (props.className || "")}>
        <label htmlFor={props.id}>{props.label}</label>
        <input
          ref={inputFieldRef}
          type="text"
          name={props.name}
          id={props.id}
          maxLength={props.maxlength}
          placeholder={props.placeholder || ""}
          value={props.value as string}
          readOnly={props.readonly}
          form={props.formId || ""}
          onChange={valueChangeHandler}
        />
        {props.required && <Icon type="fas" name="asterisk" />}
      </div>
    </>
  );
}

export default forwardRef(InputField);
