import type { FC } from 'react';
import { Input } from '@chakra-ui/react';
import type { InputProps } from '@chakra-ui/react';

interface CustomInputProps extends InputProps {
  isDisabled?: boolean;
  isReadOnly?: boolean;
  isRequired?: boolean;
  value: any;
  onChange: any;
  size?: string;
  variant?: string;
  placeholder?: string;
  type?: string;
}

const CustomInput: FC<CustomInputProps> = ({
  isDisabled = false,
  isReadOnly = false,
  isRequired = false,
  onChange = () => {},
  value,
  size,
  variant,
  placeholder = 'Enter ...',
  type = 'text',
  ...props
}) => (
    <Input
      isDisabled={isDisabled}
      isReadOnly={isReadOnly}
      isRequired={isRequired}
      value={value}
      onChange={onChange}
      size={size}
      variant={variant}
      placeholder={placeholder}
      type={type}
      {...props}
    />
  );

export default CustomInput;
