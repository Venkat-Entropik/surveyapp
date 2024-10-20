import React, { FC } from "react";
import { Tooltip } from "@chakra-ui/react";

interface TooltipProps {
  label: string;
  children: any;
  closeDelay?: number;
  closeOnClick?: boolean;
  closeOnEsc?: boolean;
  closeOnPointerDown?: boolean;
  defaultIsOpen?: boolean;
  hasArrow?: boolean;
  isDisabled?: boolean;
  placement?:any;
  bg?:any;
  color?:any;
}
const CustomTooltip: FC<TooltipProps> = ({
  label = "",
  children,
  closeDelay = 0,
  closeOnClick = true,
  closeOnEsc = true,
  closeOnPointerDown = true,
  defaultIsOpen = false,
  hasArrow = false,
  isDisabled = false,
  ...props
}) => {
  return (
    <Tooltip
      label={label}
      closeDelay={closeDelay}
      closeOnClick={closeOnClick}
      closeOnEsc={closeOnEsc}
      closeOnPointerDown={closeOnPointerDown}
      defaultIsOpen={defaultIsOpen}
      hasArrow={hasArrow}
      isDisabled={isDisabled}
      placement={props.placement}
      {...props}
    >
      {children}
    </Tooltip>
  );
};

export default CustomTooltip;
