export interface IUseHandleInput<T> {
  form: T;
  handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  resetForm: () => void;
}
