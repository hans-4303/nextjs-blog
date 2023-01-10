/* fs, path는 모듈에 기본적으로 포함된 객체 */
import fs from 'fs';
import path from 'path';
/* gray-matter는 라이브러리에서 받아오기 */
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html'

/* path 객체의 join 메서드를 통해 process.cwd()의 반환 값을 다룬다.
posts가 반환된다. */
const postsDirectory = path.join(process.cwd(), 'posts');

export function getSortedPostsData() {
  /* fs 객체의 readdirSync 메서드를 호출하고, posts 값을 반환하여 배열로 만든다. */
  const fileNames = fs.readdirSync(postsDirectory);
  /* fileNames 배열에 접근하고 map으로 반복해준다. */
  const allPostsData = fileNames.map((fileName) => {
    /* 각각의 파일에서 /\.md$/ 라는 값을 비우고 id로 만든다. */
    const id = fileName.replace(/\.md$/, '');

    /* 마크다운 파일을 문자열로 바꾸기 위해서
    path 객체의 join 메서드를 통해 전체 포스트의 경로와 각각의 파일을 지정한다. */
    const fullPath = path.join(postsDirectory, fileName);
    /* 각각의 파일을 지정했다면 fs 객체의 readFileSync 메서드를 호출하고,
    파일의 경로와 인코딩 형식을 대입한다. */
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    /* gray-matter 라이브러리를 통해서 포스트 메타데이터 섹션을 파싱한다. */
    const matterResult = matter(fileContents);

    /* matterResult.data라는 파일과 id를 리턴해준다. */
    return {
      id,
      ...matterResult.data,
    };
  });
  /* allPostsData 메서드를 반환받았다면 date에 따라 정렬해준다. */
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getAllPostIds() {
  /* fs 객체의 readdirSync 메서드를 호출하고, posts 값을 반환하여 배열로 만든다. */
  const fileNames = fs.readdirSync(postsDirectory);

  /* 반환되는 배열들의 형태
    [
      {
        params: {
          id: 'ssg-ssr'
        }
      },
      {
        params: {
          id: 'pre-rendering'
        }
      }
    ]
  */

  /* fileNames 요소만큼 접근해서 {
    params: {
      id: fileName.replace(/\.md$/, '')}
    }
  라고 값을 대입하여 리턴한다.
  */
  return fileNames.map((fileName) => {
    return {
      params: {
        /* 각각의 파일에서 /\.md$/ 라는 값을 비우고 id로 만든다.
        그리고 params 객체의 키와 값으로 사용한다. */
        id: fileName.replace(/\.md$/, ''),
      }
    }
  })
}

export async function getPostData(id) {
	/* 파라미터는 id, 그런데 params.id를 통해 대입될 것이다. */
	/* 첫째 인수에는 반환된 posts 경로를
  둘째 인수에는 각각의 id를 ${id}.md와 같이 적용해준다.
  그래서, posts/${id}.md와 같은 결과가 나올 것이다. */
  const fullPath = path.join(postsDirectory, `${id}.md`);
	/* 각각의 파일이 utf8로 인코딩됨을 뜻한다. */
  const fileContents = fs.readFileSync(fullPath, 'utf8');
	/* matter 라이브러리를 통해 각각의 파일을 읽어준다. 객체로 반환될 것이다. */
  const matterResult = matter(fileContents);

  /* remark를 반환, use 메서드를 통해 html을 지정,
	process 메서드를 연이어 써서, matterResult의 content를 대입 */
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
	/* 내용을 문자열로 바꿔서 반환 */
  const contentHtml = processedContent.toString();

  /* id(params.id), 내용, matterResult.data를 반환 */
  return {
    id,
    contentHtml,
    ...matterResult.data,
  };
}