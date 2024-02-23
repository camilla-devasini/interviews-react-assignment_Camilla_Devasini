import { styled } from "@mui/system";
import React, { forwardRef } from "react";

interface StyledContainerProps {
  noJustify?: boolean;
  center?: boolean;
  end?: boolean;
  start?: boolean;
  align?: "end" | "start" | "center";
  fullWidth?: boolean;
  padding?: string;
  position?: "absolute" | "relative";
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
}

const StyledContainer = styled("div")<StyledContainerProps>(
  ({
    noJustify,
    center,
    end,
    start,
    align,
    fullWidth,
    padding,
    position,
    top,
    left,
    right,
    bottom,
  }) => ({
    display: "flex",
    width: fullWidth ? "100%" : "auto",
    padding: padding || "0",
    justifyContent: noJustify
      ? "initial"
      : center
      ? "center"
      : end
      ? "flex-end"
      : start
      ? "flex-start"
      : "space-between",
    alignItems:
      align === "end"
        ? "flex-end"
        : align === "start"
        ? "flex-start"
        : "center",
    position: position ?? "relative",
    top: top ?? "auto",
    left: left ?? "auto",
    bottom: bottom ?? "auto",
    right: right ?? "auto",
    transform: position === "absolute" ? "translateX(-50%);" : "none",
  })
);

interface RowContainerProps extends StyledContainerProps {
  children: React.ReactNode;
}

const RowContainer = forwardRef<HTMLDivElement, RowContainerProps>(
  ({ children, ...props }, ref) => {
    return (
      <StyledContainer ref={ref} {...props}>
        {children}
      </StyledContainer>
    );
  }
);

export default RowContainer;
