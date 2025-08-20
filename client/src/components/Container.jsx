import React from "react";

const Container = ({ children, className, ...rest }) => {
  return (
    <div
      {...rest}
      className={`container max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}
    >
      {children}
    </div>
  );
};

export default Container;
