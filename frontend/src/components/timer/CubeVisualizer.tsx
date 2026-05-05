import { useRef } from "react";
import "cubing/twisty";

interface CubeVisualizerProps {
  scramble: string;
}

const CubeVisualizer = ({ scramble }: CubeVisualizerProps) => {
  const playerRef = useRef<HTMLElement>(null);

  // Bypassing TS error for custom element
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
