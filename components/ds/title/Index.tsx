import React from "react";

interface TitleProps {
  text: string;
  className?: string;
}

const Title: React.FC<TitleProps> = ({ text, className = "" }) => {
  return (
    <h1 className={`text-4xl mb-8 font-semibold text-white ${className}`}>
      {text}
    </h1>
  );
};

export default Title;
