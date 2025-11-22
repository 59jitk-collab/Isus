import { useState, useEffect, useRef, useCallback, useMemo } from 'react';

export type TimerMode = 'pomodoro' | 'shortBreak' | 'longBreak';

const POMODORO_DURATION = 25 * 60;
const SHORT_BREAK_DURATION = 5 * 60;
const LONG_BREAK_DURATION = 15 * 60;
const LONG_BREAK_INTERVAL = 4;

const FINISH_SOUND_BASE64 = 'UklGRjIAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YSQAAAAIAAgAAAAAAAAAAAAAAAAAAAD//wAA//8AAAAAAAAAAAAAAAA=';

export const useTimer = () => {
    const [timerMode, setTimerMode] = useState<TimerMode>('pomodoro');
    const [timeLeft, setTimeLeft] = useState(POMODORO_DURATION);
    const [isActive, setIsActive] = useState(false);
    const [pomodorosCompleted, setPomodorosCompleted] = useState(0);

    const intervalRef = useRef<number | null>(null);
    const finishAudio = useMemo(() => {
        try {
            return new Audio(`data:audio/wav;base64,${FINISH_SOUND_BASE64}`);
        } catch (e) {
            console.error("Failed to create finish audio:", e);
            return null;
        }
    }, []);

    const switchMode = useCallback((mode: TimerMode) => {
        setIsActive(false);
        if (intervalRef.current) clearInterval(intervalRef.current);
        setTimerMode(mode);
        switch (mode) {
            case 'pomodoro':
                setTimeLeft(POMODORO_DURATION);
                break;
            case 'shortBreak':
                setTimeLeft(SHORT_BREAK_DURATION);
                break;
            case 'longBreak':
                setTimeLeft(LONG_BREAK_DURATION);
                break;
        }
    }, []);

    useEffect(() => {
        if (isActive && timeLeft > 0) {
            intervalRef.current = window.setInterval(() => {
                setTimeLeft((prev) => prev > 0 ? prev - 1 : 0);
            }, 1000);
        } else if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [isActive, timeLeft]);

    useEffect(() => {
        if (timeLeft === 0) {
            finishAudio?.play().catch(e => console.error("Error playing finish sound:", e));

            if (timerMode === 'pomodoro') {
                const newCompleted = pomodorosCompleted + 1;
                setPomodorosCompleted(newCompleted);
                if (newCompleted % LONG_BREAK_INTERVAL === 0) {
                    switchMode('longBreak');
                } else {
                    switchMode('shortBreak');
                }
            } else {
                switchMode('pomodoro');
            }
        }
    }, [timeLeft, timerMode, pomodorosCompleted, switchMode, finishAudio]);

    const startTimer = () => setIsActive(true);
    const pauseTimer = () => setIsActive(false);

    const resetTimer = useCallback(() => {
        setIsActive(false);
        if (intervalRef.current) clearInterval(intervalRef.current);
        switch (timerMode) {
            case 'pomodoro':
                setTimeLeft(POMODORO_DURATION);
                break;
            case 'shortBreak':
                setTimeLeft(SHORT_BREAK_DURATION);
                break;
            case 'longBreak':
                setTimeLeft(LONG_BREAK_DURATION);
                break;
        }
    }, [timerMode]);

    return {
        timerMode,
        timeLeft,
        isActive,
        pomodorosCompleted,
        startTimer,
        pauseTimer,
        resetTimer,
        switchMode,
    };
};
