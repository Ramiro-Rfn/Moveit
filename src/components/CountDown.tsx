import { useContext, useEffect, useState } from 'react';
import styles from '../styles/components/CountDown.module.css';

import { ChallengesContext } from '../contexts/ChallengesContexts';
import { CountDownContext } from '../contexts/CountDownContext';


export function CountDown(){
    const {
        hasFinished,
        isActive,
        seconds,
        minutes,
        resetCountDown,
        startCountDown
    } = useContext(CountDownContext);
    
    const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('')
    const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('')

    return(
        <div >
            <div className={styles.countDownContainer}>
                <div>
                    <span>{minuteLeft}</span>
                    <span>{minuteRight}</span>
                </div>
                <span>:</span>
                <div>
                    <span>{secondLeft}</span>
                    <span>{secondRight}</span>
                </div>
            </div>

            {hasFinished ? 
                (<button 
                    disabled
                    type="button" 
                    className={styles.countDownButton}
                >
                    Ciclo encerrado
                    <img src="icons/check_circle.svg" alt="check circle" />
                </button>
                ): (
                    <>
                    {isActive ?  
                        (<button 
                            onClick={resetCountDown} 
                            type="button" 
                            className={`${styles.countDownButton} ${styles.countDownButtonActive}`}
                        >
                            Abandonar ciclo
                        </button>)
                        :
                        (<button 
                            onClick={startCountDown} 
                            type="button" 
                            className={styles.countDownButton}
                        >
                            Iniciar ciclo
                        </button>)
                    }  
                    </>
                )
            }
        </div>
    )
}