import FormError from "../models/error-message";

function required(value: string): FormError | null {
  if (!value) return { message: "This field is required" };
  return null;
}

function setErrorState(el: HTMLElement, isInvalid: boolean): void {
  isInvalid ? el.classList.add("invalid") : el.classList.remove("invalid");
}

export { required, setErrorState };
