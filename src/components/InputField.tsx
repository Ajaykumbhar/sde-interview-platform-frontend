type InputFieldProps = {
  label: string;
  type: string;
  value: string;
  onChange: (value: string) => void;
};

function InputField({ label, type, value, onChange }: InputFieldProps) {
  return (
    <div>
      <label>{label}</label>

      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

export default InputField;
