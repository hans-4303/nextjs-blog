import { getAllPostIds, getPostData } from "../../lib/posts";
import Layout from "../../components/layout";
import React from "react";
import Head from "next/head";
import Date from "../../components/date";
import utilStyles from '../../styles/utils.module.css'

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

/* params를 객체로 넣는다? params: {} 형태일 것 같다. */
export async function getStaticProps({ params }) {
  console.log(params);
  /* 포스트 데이터는 params 객체의 id 키를 통해 getPostData 메서드를 호출한다. */
  const postData = await getPostData(params.id);
  /* 리턴할 때는 props 키가 있고, postData를 포함한 객체를 내보낸다. */
  return {
    props: {
      postData,
    },
  };
}

const Post = ({ postData }) => {
  console.log(postData);
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          {/* dateString props를 넘겨준다. */}
          <Date dateString={postData.date}></Date>
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
      {/* <br></br>
      {postData.title}
      <br></br>
      {postData.id}
      <br></br>
      {postData.date} */}
    </Layout>
  );
};

export default Post;
