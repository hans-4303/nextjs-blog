/* fs, path는 모듈에 기본적으로 포함된 객체 */
import fs from 'fs';
import path from 'path';
/* gray-matter는 라이브러리에서 받아오기 */
import matter from 'gray-matter';

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