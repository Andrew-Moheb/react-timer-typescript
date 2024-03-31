import { ReactNode, createContext, useContext, useReducer } from "react";

export type Timer = {
    name: string,
    duration: number
}


type TimersState = {
    isRunning: boolean,
    timers: Timer[]
}

const intialState: TimersState = {
    isRunning: false,
    timers: []
}

type TimersContextValue = TimersState & {
    addTimer: (timerData: Timer) => void,
    startTimer: () => void,
    stopTimer: () => void,
}



const TimersContext = createContext<TimersContextValue | null>(null);


export function useTimerContext() {
    const timersCtx = useContext(TimersContext);

    if (timersCtx === null) {
        throw new Error("timersCtx is null and this is not the case!")
    }

    return timersCtx
}


type TimersContextProviderProps = {
    children: ReactNode
}

type StartTimerAction = {
    type: "START_TIMER"
}
type StopTimerAction = {
    type: "STOP_TIMER"
}
type AddTimerAction = {
    type: "ADD_TIMER",
    payload: Timer
}

type Action = StartTimerAction | StopTimerAction | AddTimerAction




function timersReducer(state: TimersState, action: Action): TimersState {

    if (action.type === "START_TIMER") {
        return { ...state, isRunning: true }
    }
    if (action.type === "STOP_TIMER") {
        return { ...state, isRunning: false }
    }
    if (action.type === "ADD_TIMER") {
        return {
            ...state, timers: [...state.timers, {
                name: action.payload.name,
                duration: action.payload.duration,
            }]
        }
    }

    return state

}


export default function TimersContextProvider({ children }: TimersContextProviderProps) {

    const [timersState, dispatch] = useReducer(timersReducer, intialState)

    const ctx: TimersContextValue = {
        timers: timersState.timers,
        isRunning: timersState.isRunning,
        addTimer(timerData) {
            dispatch({ type: "ADD_TIMER", payload: timerData })
        },
        startTimer() {
            dispatch({ type: "START_TIMER" })
        },
        stopTimer() {
            dispatch({ type: "STOP_TIMER" })
        }
    }

    return <TimersContext.Provider value={ctx}>{children}</TimersContext.Provider>
}