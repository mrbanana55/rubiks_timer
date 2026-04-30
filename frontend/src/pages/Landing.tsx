import React, { useState, useEffect, useCallback } from "react";
import Layout from "../layouts/layout";
import { useTimer } from "../hooks/useTimer";
import { formatTime } from "../utils/formatTime";
import Scramble from "../components/timer/Scramble";
import CubeVisualizer from "../components/timer/CubeVisualizer";
import { randomScrambleForEvent } from "cubing/scramble";

const Landing: React.FC = () => {
  const [scramble, setScramble] = useState<string>("Generating scramble...");

  const generateNewScramble = useCallback(async () => {
    try {
      const newScramble = await randomScrambleForEvent("333");
      setScramble(newScramble.toString());
    } catch (error) {
      console.error("Failed to generate scramble:", error);
      setScramble("R U R' U'"); // Fallback
    }
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      generateNewScramble();
    }, 0);
    return () => clearTimeout(timeout);
  }, [generateNewScramble]);

  const onFinish = useCallback(() => {
    generateNewScramble();
  }, [generateNewScramble]);

  const { time, state, isHolding } = useTimer(onFinish);

  // Determine timer color based on state
  const getTimerColor = () => {
    if (state === "ready") return "text-green-500";
    if (isHolding) return "text-red-500";
    return "text-black";
  };

  return (
    <Layout>
      <div className="flex flex-col items-center justify-start min-h-[calc(100vh-60px)] pt-12 px-4 bg-gray-50/30">
        <Scramble scramble={scramble} />
        <div className="flex gap-20">
          <div
            className={`w-full max-w-3xl transition-all duration-500 ease-in-out`}
          >
            <CubeVisualizer scramble={scramble} />
          </div>
          <div className="flex flex-col">
            <div
              className={`flex-1 flex items-center justify-center w-full transition-transform duration-300 ${state === "running" ? "scale-110" : "scale-100"}`}
            >
              <div
                className={`select-none transition-colors duration-200 ${getTimerColor()}`}
              >
                <h1
                  className={`font-mono font-bold text-7xl md:text-9xl tracking-tighter`}
                >
                  {formatTime(time)}
                </h1>
              </div>
            </div>

            <div
              className={`pb-12 transition-opacity duration-300 ${state === "running" ? "opacity-0" : "opacity-100"}`}
            >
              {state === "idle" || state === "stopped" ? (
                <div className="text-center space-y-2">
                  <p className="text-gray-400 font-medium">
                    Hold{" "}
                    <span className="px-2 py-1 bg-gray-200 rounded text-gray-700 text-sm">
                      Space
                    </span>{" "}
                    to start
                  </p>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Landing;
