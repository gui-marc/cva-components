import { cva } from "class-variance-authority";
import React from "react";

import type { ClassValue, ComponentType, Config, Props } from "./types";

export const styled = <T>(
  type: ComponentType,
  base?: ClassValue,
  config?: Config<T>
) => {
  const _class = cva(base, config);

  const styledComponent = React.forwardRef<
    React.RefObject<typeof type>,
    Props<T> & { as?: ComponentType } & {
      ref?: React.RefAttributes<typeof type>;
    } & React.ComponentProps<typeof type>
  >((props, forwardedRef) => {
    const Type = props?.as ? props.as : type;

    return React.createElement(Type, {
      ...props,
      className: _class({ ...props }),
      ref: forwardedRef,
    });
  });

  // Todo: get better displayName
  styledComponent.displayName = `Styled.${type}`;

  return styledComponent;
};
