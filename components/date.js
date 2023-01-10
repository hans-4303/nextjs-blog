/* 라이브러리에서 parseISO, format을 받아온다. */
import { parseISO, format } from 'date-fns';

/* Date 컴포넌트에서는 파라미터로 받아온 dateString을 다룬다. */
export default function Date({ dateString }) {
	/* parseISO 메서드에 파라미터를 넣고 반환해주면
	Thu Jan 02 2020 00:00:00 GMT+0900 (한국 표준시)
	Wed Jan 01 2020 00:00:00 GMT+0900 (한국 표준시)와 같이 반환된다. */
	const date = parseISO(dateString)
	/* Date 컴포넌트가 호출 후 리턴 될 때 만들 요소
	time 요소를 만들고 dateTime 속성은 파라미터로 받았던 dateString으로 둔다.
	내용은 date-fns 라이브러리의 format 메서드를 통해 반환했던 date 객체를 특정한 형태로 변환한다. */
  console.log(dateString, date)
	return <time dateTime={dateString}>{format(date, 'LLLL d, yyyy')}</time>;
}