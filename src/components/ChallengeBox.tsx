import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContexts';
import { CountDownContext } from '../contexts/CountDownContext';

import styles from '../styles/components/ChallengeBox.module.css';

export function ChallengeBox(){
    const { 
        challengeActive, 
        resetChallenge,
        completeChallenge 
    } = useContext(ChallengesContext);

    const { resetCountDown } = useContext(CountDownContext);

    function handleChallengeSucceded() {
        completeChallenge();
        resetCountDown();
    }

    function handleChallengeFailed() {
        resetChallenge();
        resetCountDown();
    }

    return(
        <div className={styles.challengeBoxContainer}>
            {challengeActive ? 
            (
                <div className={styles.challengeActive}>
                    <header>Ganhe {challengeActive.amount} xp</header>

                    <main>
                        <img src={`icons/${challengeActive.type}.svg` } alt={challengeActive.type} />

                        <strong>Novo desafio</strong>

                        <p>{challengeActive.description}</p>
                    </main>

                    <footer>
                        <button 
                            type="button" 
                            className={styles.challengeFailButton} 
                            onClick={handleChallengeFailed}
                        >
                            Falhai
                        </button>

                        <button 
                            type="button" 
                            className={styles.challengeSuccessButton}
                            onClick={handleChallengeSucceded}
                        >
                            Completei
                        </button>
                    </footer>
                </div>
            ) : (
                <div className={styles.challengeNotActive}>
                <strong>Finaleze um ciclo para receber um desafios </strong>
                <p>
                    <img src="icons/level-up.svg" alt="level up" />
                    Avance de level completando desafios.
                </p>
            </div>
            )}
            
        </div>
    )
}