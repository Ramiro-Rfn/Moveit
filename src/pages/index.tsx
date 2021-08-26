import { GetServerSideProps } from 'next';
import Head from 'next/head';

import { CountDownProvider } from '../contexts/CountDownContext';
import {ChalllengesProvider} from '../contexts/ChallengesContexts';

import { CompletedChallenges } from '../components/CompletedChallenges';
import { CountDown } from '../components/CountDown';
import { ExperienceBar } from '../components/ExpirienceBar';
import { Profile } from '../components/Profile';

import styles from '../styles/pages/Home.module.css'
import { ChallengeBox } from '../components/ChallengeBox';


interface HomeProps {
  level: number;
  currentExperience: number;
  challengeCompleted: number;
}

export default function Home(props: HomeProps) {

  console.log(props)
  return (
    <ChalllengesProvider 
      level={props.level}
      currentExperience={props.currentExperience}
      challengeCompleted={props.challengeCompleted}
    >
      <div className={styles.container}>
        <Head>
          <title>Moveit</title>
        </Head>
        <ExperienceBar/>

        <CountDownProvider>
          <section>
            <div>
              <Profile/>
              <CompletedChallenges/>
              <CountDown/>
            </div>
            <div>
              <ChallengeBox/>
            </div>
          </section>
        </CountDownProvider>
      </div>
    </ChalllengesProvider>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) =>{
  const { level, currentExperience, challengeCompleted } = ctx.req.cookies;

  return {
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengeCompleted: Number(challengeCompleted)
    }
  }
}