import React from "react";

interface ScrambleProps {
  scramble: string;
}

const Scramble: React.FC<ScrambleProps> = ({ scramble }) => {
  return (
    <div className="text-center p-4">
      <h2 className="text-xl md:text-2xl font-mono wrap-break-words">
        {scramble}
      </h2>
    </div>
  );
};

export default Scramble;
