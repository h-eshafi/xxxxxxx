export const InputLabel = ({
  htmlFor,
  name,
  extraText,
  space = false,
  required = false,
}) => {
  return (
    <label htmlFor={htmlFor} className="pl-1.5 font-medium">
      {name}
      {required && <span className="ml-1 text-red-600 font-bold">*</span>}
      {extraText && <span className="pl-1.5 block">{extraText}</span>}
      {space && <span className="hidden md:block invisible">...</span>}
    </label>
  );
};
