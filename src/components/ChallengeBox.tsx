import styles from '../styles/components/ChallengeBox.module.css';

export function ChallengeBox(){
    const hasActiveChallenge = true;
    return(
        <div className={styles.challengeBoxContainer}>
            {hasActiveChallenge ? 
            (
                <div className={styles.challengeActive}>
                    <header>Ganhe 400 xp</header>

                    <main>
                        <img src="icons/body.svg" alt="bodt" />

                        <strong>Novo desafio</strong>

                        <p>É agora Diegão, bora lá meu parça.
                            Caminhe por 3 minutos e estique suas pernaspra você ficar saudável.
                        </p>
                    </main>

                    <footer>
                        <button type="button" className={styles.challengeFailButton}>
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