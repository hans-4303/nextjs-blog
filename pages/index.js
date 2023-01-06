import Head from 'next/head';
import Image from 'next/image';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
/* getSortedPostsData 객체 받아오기 */
import { getSortedPostsData } from '../lib/posts';

/* getSortedPostData 객체를 호출하고 파싱된 마크다운 파일과 id를 반환받는다. */
export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    /* props 객체에 allPostsData라는 형태로 대입해준다. */
    props: {
      allPostsData,
    },
  };
}

export default function Home({ allPostsData }) {
  console.log(allPostsData)
  return (
    /* Layout 컴포넌트의 props로 home을 전달 */
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {/* allPostsData.map을 통해 반복해줄텐데, 첫번째 인수를 객체로 두고 키를 받아올 수 있는 점을 알게 됐다. */}
          {allPostsData?.map(({ id, date, title, img }, index) => (
            <li className={utilStyles.listItem} key={id}>
              {title}
              <br />
              {id}
              <br />
              {date}
              <br />
              {/* 이미지 및 추가도 OK */}
              {img ? <img src={img}></img> : ""}
              {/* Next의 Image 컴포넌트는 현재 폴더를 기준으로 하지 않았기 때문에 실행되지 않은 듯 하다.
              그런데 Image 컴포넌트가 외부 이미지를 보여줄 수 없게 설계되진 않았을텐데.... */}
              {/* {img ? <Image src={img} height={300} width={300}></Image> : ""} */}
              {/* 물론 이렇게 하면 인덱스도 표시될 것이다. */}
              {index}
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}