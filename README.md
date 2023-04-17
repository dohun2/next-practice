# Next.js

### getStaticProps

- 새로고침하면 pre-render 된 HTML을 가져옴
- 빌드타임에 한번만 불러오면 되는 데이터에 사용 (SSG)
- revalidate
  - ISR 방식을 지원하기 위해 만든 속성
  - page만 업데이트
  - 데이터가 바뀌면 다시 pre-render
  - 데이터가 바뀌지 않으면 next가 pre-render를 하지 않음
- 예시코드
  ```tsx
  import type { NextPage } from 'next';

  interface Props {
    data: number;
  }

  // Example의 data는 아래의 getStaticProps에서 받아옴.
  const Example: NextPage<Props> = ({ data }) => {
    return (
      <main>
        <h1>getStaticProps Page</h1>
        <p>값: {data}</p>
      </main>
    );
  };

  export default Example;

  // 개발환경에서는 적용 x (사용자가 진입할 때마다 getStaticProps() 실행)
  // 프로덕트 환경에서만 적용
  export async function getStaticProps() {
    const delayInSeconds = 2;
    const data = await new Promise((resolve) =>
      setTimeout(() => resolve(Math.random()), delayInSeconds * 1000)
    );

    return {
      props: { data },
      // 5초마다 데이터 확인 후 갱신
      revalidate: 5,
    };
  }
  ```
