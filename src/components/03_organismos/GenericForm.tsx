import React, { useState } from 'react';


// Definimos los tipos necesarios
type Field = {
  key: string;
  type: string;
  isInput: boolean;
};

type FormProps<T> = {
  fields: Field[];
  onSubmit: (data: T) => void;
};

type FormData = {
  [key: string]: string;
};

// Componente del formulario genérico
export function GenericForm<T>({ fields, onSubmit }: FormProps<T>) {
  const [formData, setFormData] = useState<FormData>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData as T);
  };


  return (
    <form onSubmit={handleSubmit}>
      {fields.map((field) => (
        <div key={field.key}>
          <label htmlFor={field.key}>{field.key}</label>
          {field.isInput ? (
            <input
              type={field.type}
              id={field.key}
              name={field.key}
              value={formData[field.key] || ''}
              onChange={handleChange}
            />
          ) : (
            <textarea
              id={field.key}
              name={field.key}
              value={formData[field.key] || ''}
              onChange={handleChange}
            />
          )}
        </div>
      ))}

      <button type="submit">'Aceptar'</button>
    </form>
  );
}
