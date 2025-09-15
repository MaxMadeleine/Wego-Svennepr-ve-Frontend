import React from 'react';
import { useForm } from 'react-hook-form';
import { LoadingButton } from './LoadingButton';

export const Form = ({ 
  onSubmit, 
  loading = false, 
  children, 
  className = '',
  submitText = 'Submit',
  ...props 
}) => {
  const methods = useForm();

  const handleSubmit = methods.handleSubmit((data) => {
    onSubmit(data, methods);
  });

  return (
    <form onSubmit={handleSubmit} className={`space-y-4 ${className}`} {...props}>
      {/* Render children with form methods */}
      {typeof children === 'function' ? children(methods) : children}
      
      <LoadingButton
        type="submit"
        loading={loading}
        className="w-full"
      >
        {submitText}
      </LoadingButton>
    </form>
  );
};

export const FormField = ({ 
  label, 
  name, 
  type = 'text', 
  placeholder = '', 
  rules = {}, 
  className = '',
  methods 
}) => {
  const { register, formState: { errors } } = methods;

  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      <input
        {...register(name, rules)}
        type={type}
        placeholder={placeholder}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
      {errors[name] && (
        <p className="text-red-500 text-sm mt-1">{errors[name].message}</p>
      )}
    </div>
  );
};