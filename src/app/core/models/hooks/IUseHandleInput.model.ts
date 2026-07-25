export interface IUseHandleInput<T> {
  form: T;
  handleInput: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  resetForm: () => void;
}
