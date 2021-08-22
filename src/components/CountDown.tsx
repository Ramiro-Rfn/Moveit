import { useContext, useEffect, useState } from 'react';
import styles from '../styles/components/CountDown.module.css';

import { ChallengesContext } from '../contexts/ChallengesContexts';

let countDownTimeout: NodeJS.Timeout;

export function CountDown(){
    const { startNewChallenge } = useContext(ChallengesContext)

    const [time, setTime] = useState(0.1 * 60);
    const [isActive, setIsActive] = useState(false);
    const [hasFinished, setHasFinished] = useState(false);

    const minutes = Math.floor(time / 60)
    const seconds = time % 60;
    
    const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('')
    const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('')

    function startCountDown(){
        setIsActive(true)
    }

    function resetCountDown(){
        clearTimeout(countDownTimeout);
        setIsActive(false);
        setTime(0.1 * 60)
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