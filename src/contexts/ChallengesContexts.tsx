import { createContext, ReactNode, useEffect, useState } from 'react';
import Cookies from 'js-cookie';

import challenges from '../../challenges.json';
import { LevelUpModal } from '../components/LevelUpModal';


interface ChallengesProviderProps{
    children: ReactNode;
    level: number;
    currentExperience: number;
    challengeCompleted: number;
}

interface Challenge {
    type: 'body' | 'eye';
    description: string;
    amount: number;
}

interface ChallengeContextData{
    level: number;
    currentExperience: number;
    challengeActive: Challenge;
    challengeCompleted: number;
    experienceToNextLevel: number;
    levelUp: () => void;
    startNewChallenge: () => void;
    resetChallenge: () => void;
    completeChallenge: () => void;
    closeLeveUpModal: () => void;

}

export const ChallengesContext = createContext({} as ChallengeContextData);


export function ChalllengesProvider({ children, ...rest}: ChallengesProviderProps){
    const [level, setLevel] = useState(rest.level ?? 1);
    const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0);
    const [challengeCompleted, setChallengeCompleted] = useState(rest.challengeCompleted?? 0);

    const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);

    const [challengeActive, setChallengeActive] = useState(null);

    const experienceToNextLevel = Math.pow((level +1) * 4,2);

    useEffect(()=>{
        Notification.requestPermission();
    },[]);

    useEffect(()=> {
        Cookies.set('level', String(level));
        Cookies.set('currentExperience', String(currentExperience));
        Cookies.set('challengeCompleted', String(challengeCompleted));
    },[level, currentExperience, challengeCompleted]);

    function levelUp(){
        setLevel(level +1);
        setIsLevelUpModalOpen(true);
    };

    function startNewChallenge(){
        const challengeIndex = Math.floor(Math.random() * challenges.length);

        const challenge = challenges[challengeIndex];

        setChallengeActive(challenge);

        new Audio('/notification.mp3').play();

        if(Notification.permission === 'granted'){
            new Notification('Novo desafio 🔥', {
                body: `Valendo ${challenge.amount} px!`
            })
        }
    }

    function resetChallenge(){
        setChallengeActive(null);
    }

    function closeLeveUpModal(){
        setIsLevelUpModalOpen(false);
    }

    function completeChallenge(){
        if(!challengeActive){
            return;
        }

        const { amount } = challengeActive;

        let finalExperience = currentExperience + amount;

    
        if(finalExperience >= experienceToNextLevel) {
            finalExperience = finalExperience - experienceToNextLevel;
            levelUp();
        }


        console.log(experienceToNextLevel, level, finalExperience)


        setCurrentExperience(finalExperience);
        setChallengeActive(null);
        setChallengeCompleted(challengeCompleted +1);
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
                resetChallenge,
                experienceToNextLevel,
                completeChallenge,
                closeLeveUpModal
            }}
        >
            {children}

            {isLevelUpModalOpen && <LevelUpModal />}
        </ChallengesContext.Provider>
    )
}

