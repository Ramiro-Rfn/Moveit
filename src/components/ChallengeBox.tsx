import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContexts';

import styles from '../styles/components/ChallengeBox.module.css';

export function ChallengeBox(){
    const { challengeActive, resetChallenge } = useContext(ChallengesContext)

    return(
        <div className={styles.challengeBoxContainer}>
            {challengeActive ? 
            (
                <div className={styles.challengeActive}>
                    <header>Ganhe {challengeActive.amout} xp</header>

                    <main>
                        <img src={`icons/${challengeActive.type}.svg` } alt={challengeActive.type} />

                        <strong>Novo desafio</strong>

                        <p>{challengeActive.description}</p>
                    </main>

                    <footer>
                        <button 
                            type="button" 
                            className={styles.challengeFailButton} 
                            onClick={resetChallenge}
                        >
                            Falhai
                        </button>

                        <button type="button" className={styles.challengeSuccessButton}>
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