import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import FormError from "@/models/error-message";
import * as Validators from "@/validators";
import Icon from "@/components/icon/icon";
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
  onChange?: (value: string) => void;
  onError?: (error: FormError) => void;
  validate?: (value: string) => FormError;
}

function TextAreaField(props: TextAreaProps, ref: any) {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [inValid, setInValid] = useState(props.validate && !!props.validate(props.value as string));
  const [value, setValue] = useState<string>(props.value as string);

  useImperativeHandle(ref, () => ({
    isValid() {
      return !inValid;
    },
    focus() {
      textAreaRef.current && (textAreaRef.current as HTMLElement).focus();
    },
    getInputValue() {
      return value;
    },
    reset() {
      setValue("");
    },
  }));

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
    return () => {
      setValue("");
    };
  }, [props.resizeAble, props.width, props.height]);

  const valueChangeHandler = (controlValue: string) => {
    if (props.validate) {
      const fieldError: FormError | null = props.validate(controlValue);
      Validators.setErrorState(textAreaRef.current as HTMLElement, !!fieldError);
      setInValid(!!fieldError);
      if (props.onError && fieldError) {
        props.onError(fieldError);
      }
    }
    setValue(controlValue);
  };

  return (
    <>
      <div className={"text-area-container " + (props.className || "")}>
        <label htmlFor={props.id}>{props.label}</label>
        <textarea
          ref={textAreaRef}
          name={props.name}
          id={props.id}
          maxLength={props.maxlength}
          placeholder={props.placeholder || ""}
          value={value}
          readOnly={props.readonly}
          form={props.formId || ""}
          onChange={(e) => valueChangeHandler(e.target.value)}
        />
        {props.required && <Icon type="fas" name="asterisk" />}
      </div>
    </>
  );
}

export default forwardRef(TextAreaField);
