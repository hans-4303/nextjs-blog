import Head from "next/head";
import Image from "next/image";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
/* getSortedPostsData 객체 받아오기 */
import { getSortedPostsData } from "../lib/posts";
import Link from "next/link";
import Date from "../components/date";

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
  console.log(allPostsData);
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
              <Link href={`/posts/${id}`}>{title}</Link>
              <br />
              <small className={utilStyles.lightText}>
                {console.log(date)}
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}
