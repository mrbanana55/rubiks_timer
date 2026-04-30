import React, { useEffect, useRef } from "react";
import "cubing/twisty";

interface CubeVisualizerProps {
  scramble: string;
}

const CubeVisualizer: React.FC<CubeVisualizerProps> = ({ scramble }) => {
  const playerRef = useRef<any>(null);

  useEffect(() => {
    if (
      playerRef.current &&
      scramble &&
      scramble !== "Generating scramble..."
    ) {
      playerRef.current.scramble = scramble;
    }
  }, [scramble]);

  // Bypassing TS error for custom element
  const TwistyPlayer = "twisty-player" as any;

  return (
    <div className="flex justify-center my-4">
      <TwistyPlayer
        ref={playerRef}
        alg={scramble}
        visualization="2D"
        control-panel="none"
        background="none"
        style={{ width: "250px", height: "250px" }}
      ></TwistyPlayer>
    </div>
  );
};

export default CubeVisualizer;
