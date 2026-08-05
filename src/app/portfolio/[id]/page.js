import { createClient } from '@/app/utils/supabase/client';

export default async function Portfolio({ params }) {
  const supabase = createClient();
  const { id } = await params;
  console.log(id);

  const { data, error } = await supabase.from('portfolio').select().eq('id', id).single();
  console.log(data);

  return (
    <div className='portoflio-single'>
      <div className='row'>
        <div className='col-md-8 decription'>
          <div className='contents shadow'>
            {/* <img src="images/portfolio_single_img1.jpg" alt="img1"> */}
            <p>{data?.rep1_desc ?? ''}</p>
          </div>
          <div className='contents shadow'>
            {/* <img src="images/portfolio_single_img2.jpg" alt="img2"> */}
            <p>{data?.rep2_desc ?? ''}</p>
          </div>
        </div>
        <div className='col-md-4 portfolio_info'>
          <div className='contents shadow'>
            <h2>{data?.title ?? 'Project Title'}</h2>
            <div>{data?.content ?? ''}</div>
            <p className='link'>
              <a href={data?.url ?? ''}>Visit site &rarr;</a>
            </p>
            <hr className='double' />
            <blockquote>
              <p>“{data?.review ?? ''}”</p>
              <small>- {data?.reviewer ?? ''} -</small>
            </blockquote>
            <p className='nav'>
              <a href='' className='secondary-btn'>
                &larr; Previous Project
              </a>
              <a href='' className='secondary-btn'>
                Next Project &rarr;
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
