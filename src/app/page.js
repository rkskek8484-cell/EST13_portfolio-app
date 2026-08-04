import { createClient } from './utils/supabase/client';

export default async function Page() {
  const supabase = await createClient();
  const { data: projects, error } = await supabase.from('portfolio').select();
  console.log(projects);

  if (error) {
    console.error('연결실패', error);
    return <div>프로젝트 로드 실패</div>;
  }

  return <></>;
}
