const InputField = ({ name, placeholder, value, setValue }) => {
  return (
    <label className="input input-bordered flex w-full items-center gap-2">
      {name}:
      <input
        type="text"
        className="grow"
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e)}
      />
    </label>
  );
};

export default InputField;
