import { useEffect, useRef, useState } from 'react';
import { useTimerContext, type Timer as TimerProps } from '../store/timer-context.tsx';
import Container from './UI/Container.tsx';

export default function Timer({ name, duration }: TimerProps) {
  const interval = useRef<number | null>(null)
  const [remainingTime, setRemainingTime] = useState(duration * 1000);
  const { isRunning } = useTimerContext()

  if (remainingTime <= 0 && interval.current) {
    clearInterval(interval.current);
  }

  //  setRemainingTime((prevTime) => {


  useEffect(function () {
    let timer: number
    if (isRunning) {
      timer = setInterval(function () {
        setRemainingTime((prevTime) => {
          if (prevTime <= 0) {
            return prevTime;
          }
          return prevTime - 50;
        });
      }, 50)

    } else if (interval.current) {
      clearInterval(interval.current);
    }
    return () => clearInterval(timer)
  }, [isRunning])

  const formatedRemainingTime = (remainingTime / 1000).toFixed(2)
  return (
    <Container as="article">
      <h2>{name}</h2>
      <p><progress max={duration * 1000} value={remainingTime} /></p>
      <p>{formatedRemainingTime === "-0.05" ? "0.00" : formatedRemainingTime}</p>
    </Container>
  );
}
