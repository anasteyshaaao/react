import React from 'react';
import { useController } from 'react-hook-form';

const NameInput = ({ control, name, rules, defaultValue = '' }) => {
  const {
    field: { ref, ...inputProps },
    fieldState: { error },
  } = useController({
    name,
    control,
    rules,
    defaultValue,
  });

  return (
    <div>
      <label>Имя</label>
      <input {...inputProps} ref={ref} />
      {error && <span className="error">{error.message}</span>}
    </div>
  );
};

export default NameInput;