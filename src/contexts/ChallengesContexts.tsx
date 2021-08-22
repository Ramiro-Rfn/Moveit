import { createContext, ReactNode, useState } from 'react';
import challenges from '../../challenges.json';


interface ChallengesProviderProps{
    children: ReactNode;
}

interface Challenge {
    type: 'body' | 'eye';
    description: string;
    amout: number;
}

interface ChallengeContextData{
    level: number;
    currentExperience: number;
    challengeActive: Challenge;
    challengeCompleted: number;
    levelUp: () => void;
    startNewChallenge: () => void;
    resetChallenge: () => void;
}

export const ChallengesContext = createContext({} as ChallengeContextData);


export function ChalllengesProvider({children}: ChallengesProviderProps){
    const [level, setLevel] = useState(1);
    const [currentExperience, setCurrentExperience] = useState(0);
    const [challengeCompleted, setChallengeCompleted] = useState(0);

    const [challengeActive, setChallengeActive] = useState(null);

    function levelUp(){
        setLevel(level +1);
    };

    function startNewChallenge(){
        const challengeIndex = Math.floor(Math.random() * challenges.length);

        const challenge = challenges[challengeIndex];

        setChallengeActive(challenge)
    }

    function resetChallenge(){
        setChallengeActive(null);
    }

    return(
        <ChallengesContext.Provider 
            value={{
                level,
                currentExperience,
                challengeCompleted,
                levelUp,
                challengeActive,
                startNewChallenge,
                resetChallenge
            }}
            >
            {children}
        </ChallengesContext.Provider>
    )
}

