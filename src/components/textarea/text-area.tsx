import { ChangeEvent, useEffect, useRef } from "react";
import FormError from "../../models/error-message";
import { setErrorState } from "../../validators";
import Icon from "../icon/icon";
import "./text-area.scss";

interface TextAreaProps {
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
  resizeAble?: boolean;
  width?: number;
  height?: number;
  onChange: (value: string) => void;
  onError?: (error: FormError) => void;
  validate?: (value: string) => FormError;
}

function TextAreaField(props: TextAreaProps) {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const valueChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const controlValue: string = e.target.value;
    if (props.validate) {
      const fieldError: FormError | null = props.validate(controlValue);
      setErrorState(textAreaRef.current as HTMLElement, !!fieldError);
      if (props.onError && fieldError) {
        props.onError(fieldError);
      }
    }
    props.onChange(controlValue);
  };

  useEffect(() => {
    const textAreaEl = textAreaRef.current as HTMLTextAreaElement;
    if (!props.resizeAble) {
      textAreaEl.style.resize = "none";
    }
    if (props.width) {
      textAreaEl.style.width = `${props.width}px`;
    }
    if (!props.height) {
      textAreaEl.style.height = `${props.height}px`;
    }
  }, [props.resizeAble, props.width, props.height]);
  return (
    <>
      <div className={"input-field-container " + (props.className || "")}>
        <label htmlFor={props.id}>{props.label}</label>
        <textarea
          ref={textAreaRef}
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

export default TextAreaField;
