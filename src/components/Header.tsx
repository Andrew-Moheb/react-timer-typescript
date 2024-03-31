import { useTimerContext } from '../store/timer-context.tsx';
import Button from './UI/Button.tsx';

export default function Header() {
  const timers = useTimerContext()
  return (
    <header>
      <h1>Andrew's ReactTimer 🧭</h1>

      <Button onClick={timers.isRunning ? timers.stopTimer : timers.startTimer}>{timers.isRunning ? "Stop" : "Start"} Timers</Button>
    </header>
  );
}
