import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

import { ChallengesContext } from './ChallengesContexts';


interface CountDownProviderProps{
    children: ReactNode;
}


interface CountDownContextData{
    minutes: number;
    seconds: number;
    isActive: boolean;
    hasFinished: boolean;
    startCountDown: () => void;
    resetCountDown: () => void;
}

export const CountDownContext = createContext({} as CountDownContextData);


export function CountDownProvider({children}: CountDownProviderProps){
    const { startNewChallenge } = useContext(ChallengesContext)

    const [time, setTime] = useState(0.05 * 60);
    const [isActive, setIsActive] = useState(false);
    const [hasFinished, setHasFinished] = useState(false);

    const minutes = Math.floor(time / 60)
    const seconds = time % 60;

    let countDownTimeout: NodeJS.Timeout;

    function startCountDown(){
        setIsActive(true)
    }

    function resetCountDown(){
        clearTimeout(countDownTimeout);
        setIsActive(false);
        setTime(0.1 * 60);
        setHasFinished(false);
    }

    useEffect(()=>{
        if(isActive && time > 0){
            countDownTimeout = setTimeout(()=>{
                setTime(time - 1 )
            }, 1000)
        }else if(isActive && time === 0){
            setHasFinished(true);
            setIsActive(false);
            startNewChallenge();
        }
    }, [isActive, time])
    

    return(
        <CountDownContext.Provider 
            value={{
                minutes,
                seconds,
                hasFinished,
                isActive,
                resetCountDown,
                startCountDown
            }}
        >
            {children}
        </CountDownContext.Provider>
    )
}

