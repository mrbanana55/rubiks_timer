import { useState, useEffect, useCallback, useRef } from "react";

export type TimerState = "idle" | "ready" | "running" | "stopped";

export const useTimer = (onFinish: (time: number) => void) => {
  const [time, setTime] = useState(0);
  const [state, setState] = useState<TimerState>("idle");
  const [isHolding, setIsHolding] = useState(false);
  
  const timerInterval = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);
  const holdTimeoutRef = useRef<number | null>(null);
  const isHoldingRef = useRef(false);

  const startTimer = useCallback(() => {
    startTimeRef.current = Date.now();
    setState("running");
    timerInterval.current = window.setInterval(() => {
      setTime(Date.now() - startTimeRef.current);
    }, 10);
  }, []);

  const stopTimer = useCallback(() => {
    if (timerInterval.current) {
      clearInterval(timerInterval.current);
      timerInterval.current = null;
    }
    const finalTime = Date.now() - startTimeRef.current;
    setTime(finalTime);
    setState("stopped");
    onFinish(finalTime);
  }, [onFinish]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code !== "Space") return;
      e.preventDefault(); // Prevent scrolling

      if (state === "running") {
        stopTimer();
        return;
      }

      if ((state === "idle" || state === "stopped") && !isHoldingRef.current) {
        isHoldingRef.current = true;
        setIsHolding(true);
        
        if (holdTimeoutRef.current) clearTimeout(holdTimeoutRef.current);
        
        holdTimeoutRef.current = window.setTimeout(() => {
          setState("ready");
        }, 500);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code !== "Space") return;
      e.preventDefault();

      if (isHoldingRef.current) {
        isHoldingRef.current = false;
        setIsHolding(false);

        if (holdTimeoutRef.current) {
          clearTimeout(holdTimeoutRef.current);
          holdTimeoutRef.current = null;
        }

        if (state === "ready") {
          startTimer();
        } else if (state !== "running") {
          setState("idle");
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      if (holdTimeoutRef.current) clearTimeout(holdTimeoutRef.current);
    };
  }, [state, startTimer, stopTimer]);

  const reset = useCallback(() => {
    setTime(0);
    setState("idle");
  }, []);

  return { time, state, isHolding, reset };
};
