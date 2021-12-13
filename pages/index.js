import React from 'react';
import Head from 'next/head';
import Button from '@mui/material/Button';
import Link from 'next/link';

import styles from '../styles/index.module.css';
import PublicLayout from '../src/layouts/publicLayout';

const Home = () => {
  return (
    <>
    <Head>
      <title>Play and</title>
      <meta charSet="utf-8" />
      <meta name="author" content="장현광" />
      <meta name="description" content="온라인에서 테니스 만남을 이어가세요" />
      <meta name="subject" content="Online tennis community" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content="Play and" />
      <meta property="og:description" content="온라인에서 테니스 만남을 이어가세요" />
      <meta property="og:image" content="/src/images/logo.png" />
      <meta property="og:url" content="https://playand.netlify.app/" />
    </Head>
    <PublicLayout>
      <div className={styles.index}>
        <div className={styles.container__index}>
          <section>
            <div className={styles.greeting}>
              <h1>'Play &'는 온라인 모임 공간을 찾던 테니스 동호인들을 위한 새로운 정답이 될&nbsp;것입니다.</h1>
              <h2>'Play &'와 함께 실력을 쌓아가고 새로운 만남을 이어나가세요.</h2>
            </div>
            <Button variant="contained"><Link href="/my-groups"><a>Get Started</a></Link></Button>
          </section>
          <section>
            <div className={styles.intro}>
              <div className={styles.intro__board}>
                <h1 className={styles.title}>게시판</h1>
                <p className={styles.desc}>그룹원들에게 중요한 사항을 전달하세요.</p>
                {/* 버튼 추가 혹은 버튼 없이 */}
              </div>
              <div className={styles.intro__chat}>
                <h1 className={styles.title}>대화</h1>
                <p className={styles.desc}>그룹원들과 실시간 대화를 나누세요.</p>
                {/* 버튼 추가 혹은 버튼 없이 */}
              </div>
              <div className={styles.intro__memory}>
                <h1 className={styles.title}>추억</h1>
                <p className={styles.desc}>그룹의 추억을 공유하고 남기세요.</p>
                {/* 버튼 추가 혹은 버튼 없이 */}
              </div>
              <div className={styles.intro__ranking}>
                <h1 className={styles.title}>랭킹</h1>
                <p className={styles.desc}>게임 결과를 기록하고 실시간 랭킹을 확인하세요.</p>
                {/* 버튼 추가 혹은 버튼 없이 */}
              </div>
            </div>
          </section>
        </div>
      </div>
    </PublicLayout>
    </>
  )
}

export default Home