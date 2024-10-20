import React, { FC } from "react";
import { Textarea, TextareaProps } from "@chakra-ui/react";
interface CustomInputProps extends TextareaProps {
  isDisabled?: boolean;
  isReadOnly?: boolean;
  isRequired?: boolean;
  value: any;
  onChange: any;
  size?: string;
  variant?: string;
  placeholder?: string;
}

const CustomTextArea: FC<CustomInputProps> = ({
  isDisabled = false,
  isReadOnly = false,
  isRequired = false,
  onChange = () => {},
  value,
  size,
  variant,
  placeholder = "Enter ...",
  ...props
}) => {
  return (
    <Textarea
      isDisabled={isDisabled}
      isReadOnly={isReadOnly}
      isRequired={isRequired}
      value={value}
      onChange={onChange}
      size={size}
      variant={variant}
      placeholder={placeholder}
      {...props}
    />
  );
};

export default CustomTextArea;
