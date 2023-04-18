# Next.js

### getStaticProps

- 공식문서 : [Data Fetching: getStaticProps | Next.js](https://nextjs.org/docs/basic-features/data-fetching/get-static-props)

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

### getServerSideProps

- 공식문서 :  [Data Fetching: getServerSideProps | Next.js](https://nextjs.org/docs/basic-features/data-fetching/get-server-side-props)

- 빌드타임이 아닌 리퀘스트타임에 pre-render (페이지에 들어올 때마다)

- 리퀘스트타임에 서버사이드에서 렌더링 해야하는 페이지에 사용
  
  - 사용자에 인증 정보에 따라 변하는 페이지
  
  - 보안이 중요한 페이지

- URL query parameter가 page props로 반드시 필요한 경우에도 사용

- 예시코드
  
  ```tsx
  import type { GetServerSideProps, NextPage } from 'next';
  
  interface Props {
    data: number;
  }
  
  const Example: NextPage<Props> = ({ data }) => {
    return (
      <main>
        <h1>getServerSideProps Page</h1>
        <p>값: {data}</p>
      </main>
    );
  };
  
  export default Example;
  
  export const getServerSideProps: GetServerSideProps = async ({ res }) => {
    const delayInSeconds = 2;
    const data = await new Promise((resolve) =>
      setTimeout(() => resolve(Math.random()), delayInSeconds * 1000)
    );
  
    return {
      props: { data },
    };
  };
  ```



### Link

- 공식문서 : [next/link | Next.js](https://nextjs.org/docs/api-reference/next/link)

- Link로 이동시 HTML 파일을 불러오지 않고 JS 파일만 불러옴 (CSR)
  
  - Link 사용 시 타켓페이지의 DOM을 JS파일로 가지고 옴.
  
  - json 파일에는 props가 저장되어 있음.

- Link 페이지에서 이동한 후 뒤로가기까지 일어나는 일
  
  1. 첫 render에서 Link가 있는 페이지의 HTML파일을 불러온다. 
  
  2. 타켓 페이지로 이동시 그 페이지의 JS 파일만 불러온다.
  
  3.  뒤로가면 Link페이지의 HTML파일은 불러오지 않고 JS 파일만 불러온다.

. 링크 아이템이 보이지 않을 때는 타켓 페이지의 JS, JSON 파일을 가져오지 않음.

. 예시코드
  
  ```tsx
  import Link from 'next/link';
  
  export default function Links() {
    return (
      <main>
        <h1>Links</h1>
        <Link href="/section1/getStaticProps">/getStaticProps</Link>
      </main>
    );
  }
  
  ```

### router

- 공식문서: [next/router | Next.js](https://nextjs.org/docs/api-reference/next/router#userouter)

- Link와 다르게 타켓페이지의 정보를 미리 가져오지 않음

- 예시코드
  
  ```tsx
  import Link from 'next/link';
  import { useRouter } from 'next/router';
  import { useEffect } from 'react';
  
  export default function Links() {
    const router = useRouter();
    // 타켓 페이지의 정보를 미리 가져오기 위한 코드
    useEffect(() => {
      router.prefetch('/section1/getStaticProps');
    }, [router]);
  
    return (
      <main>
        <h1>Links</h1>
        <button
          onClick={() => {
            router.push('/section1/getStaticProps');
          }}
        >
          /getStaticProps
        </button>
      </main>
    );
  }
  ```
