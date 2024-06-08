import React, { ReactNode } from 'react';

const MaxWidthWrapper = ({ children, className }: { children: ReactNode; className?: string }) => {
  return (
    <div className={`container min-h-screen pt-32 mx-auto ${className}`}>
      {children}
    </div>
  );
};

export default MaxWidthWrapper;