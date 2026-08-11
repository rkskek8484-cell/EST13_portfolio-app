import Image from 'next/image';
import { createClient } from '../utils/supabase/client';
import Link from 'next/link';

export default async function Portfolio({ searchParams }) {
  const params = await searchParams;
  const page = Number(params.page ?? 1);

  const supabase = createClient();
  //페이지네이션 설정
  const PAGE_SIZE = 6;

  //1. portfolio 테이블 데이터 총 개수
  const { count, error: countError } = await supabase.from('portfolio').select('*', { count: 'exact', head: true });

  if (countError) {
    return <p>{countError.message}</p>;
  }
  // 2. 하단 페이지네이션 링크 생성
  const pageCount = Math.ceil(count / PAGE_SIZE);
  const pageCountArray = [];
  for (let i = 1; i < pageCount; i++) {
    pageCountArray.push(i);
  }
  console.log(pageCountArray);

  //3. 링크 클릭 시
  const from = (page - 1) * PAGE_SIZE; //page1 from 0
  const to = from + PAGE_SIZE - 1; //page1 to 5

  const { data, error } = await supabase.from('portfolio').select().order('id', { ascending: false }).range(from, to);

  if (error) {
    console.error('연결실패', error);
    return <div>프로젝트 로드 실패</div>;
  }

  const getPublicURL = path => {
    if (!path) return '';
    const { data: publicUrlData } = supabase.storage.from('portfolio').getPublicUrl(path);
    return publicUrlData.publicUrl;
  };

  return (
    <>
      <div className="latest_portfolio">
        <div className="row list">
          {data.map(item => (
            <div className="col-md-4" key={item.id}>
              <div className="contents shadow">
                {item.thumbnail && (
                  <div style={{ height: 209 }}>
                    <Image
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      src={getPublicURL(item.thumbnail)}
                      width={364}
                      height={209}
                      alt={item.title}
                    />
                  </div>
                )}
                <div className="hover_contents">
                  <div className="list_info">
                    <h3>
                      <a href={`/portfolio/${item.id}`}>{item.title}</a>
                      <Image src="/images/portfolio_list_arrow.png" width={6} height={8} alt="list arrow" />
                    </h3>
                    <p>
                      <a href="">Click to see project</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <p className="pagenation shadow">
          {pageCountArray.map(i => (
            <Link key={i} href={`?page=${i}`} className="secondary-btn active">
              {i}
            </Link>
          ))}
        </p>
      </div>
    </>
  );
}
