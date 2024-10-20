import React, { FC, JSXElementConstructor, ReactElement } from "react";
import { Button, ButtonProps } from "@chakra-ui/react";

interface CustomButtonProps extends ButtonProps {
  isActive?: boolean;
  isDisabled?: boolean;
  isLoading?: boolean;
  size?: "lg" | "md" | "sm" | "xs";
  leftIcon?: ReactElement<any, string | JSXElementConstructor<any>>;
  loadingText?: string | number | boolean;
  rightIcon?: ReactElement<any, string | JSXElementConstructor<any>>;
  spinnerPlacement?: "start" | "end";
  variant?:
    | "primary"
    | "link-green"
    | "secondary"
    | "secondary-gray"
    | "tertiary"
    | "tertiary-gray"
    | "link"
    | "link-gray"
    | "error"
    | "danger-primary"
    | "danger-secondary"
    | "danger-tertiary"
    | "danger-link";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  ref?: any;
}
const CustomButton: FC<CustomButtonProps> = ({
  isActive = false,
  isDisabled = false,
  isLoading = false,
  size = "md",
  leftIcon,
  loadingText,
  rightIcon,
  spinnerPlacement,
  variant,
  onClick,
  ref,
  ...props
}) => {
  return (
    <Button
      isActive={isActive}
      isDisabled={isDisabled}
      isLoading={isLoading}
      size={size}
      loadingText={loadingText}
      spinnerPlacement={spinnerPlacement}
      variant={variant}
      onClick={onClick}
      {...props}
    >
      {leftIcon && leftIcon}
      {props.children}
      {rightIcon && rightIcon}
    </Button>
  );
};

export default CustomButton;
