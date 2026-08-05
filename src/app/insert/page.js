'use client';

import { createClient } from '../utils/supabase/client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Insert() {
  const supabase = createClient();
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    url: '',
    review: '',
    reviewer: '',
    rep1_img: '',
    rep1_desc: '',
    rep2_img: '',
    rep2_desc: '',
    thumbnail: '',
  });

  const [thumbnail, setThumbnail] = useState(null);

  async function insertData(e) {
    e.preventDefault();
    const { error } = await supabase.from('portfolio').insert(formData);
    if (error) {
      console.log(error);
    } else {
      console.log('데이터 입력 성공');
      router.push('/');
    }
  }

  const handleChange = e => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = e => {
    setThumbnail(e.target.files[0]);
  };

  return (
    <div className='about_content shadow'>
      <h2 className='mb-3'>데이터 입력</h2>

      <div className='contact_form'>
        <form onSubmit={insertData}>
          <p className='field'>
            <label htmlFor='title'>프로젝트 이름:</label>
            <input type='text' id='title' name='title' placeholder='프로젝트 이름' required onChange={handleChange} />
          </p>
          <p className='field'>
            <label htmlFor='content'>프로젝트 설명:</label>
            <textarea
              name='content'
              id='content'
              cols='30'
              rows='10'
              placeholder='프로젝트 설명'
              required
              onChange={handleChange}
            ></textarea>
          </p>
          <p className='field'>
            <label htmlFor='url'>프로젝트 주소:</label>
            <input type='url' id='url' name='url' placeholder='프로젝트 주소' onChange={handleChange} />
          </p>
          <p className='field'>
            <label htmlFor='review'>프로젝트 후기:</label>
            <textarea
              name='review'
              id='review'
              cols='30'
              rows='10'
              placeholder='프로젝트 후기'
              onChange={handleChange}
            ></textarea>
          </p>
          <p className='field'>
            <label htmlFor='reviewer'>후기 글쓴이:</label>
            <input type='text' id='reviewer' name='reviewer' placeholder='후기 글쓴이' onChange={handleChange} />
          </p>
          <p className='field'>
            <label htmlFor='rep1_img'>대표 이미지 1:</label>
            <input type='file' id='rep1_img' name='rep1_img' accept='image/*' />
          </p>
          <p className='field'>
            <label htmlFor='rep1_desc'>대표 이미지 1 설명:</label>
            <input type='text' id='rep1_desc' name='rep1_desc' onChange={handleChange} />
          </p>
          <p className='field'>
            <label htmlFor='rep2_img'>대표 이미지 2:</label>
            <input type='file' id='rep2_img' name='rep2_img' accept='image/*' />
          </p>
          <p className='field'>
            <label htmlFor='rep2_desc'>대표 이미지 2 설명:</label>
            <input type='text' id='rep2_desc' name='rep2_desc' onChange={handleChange} />
          </p>

          <p className='field'>
            <label htmlFor='thumbnail'>썸네일:</label>
            <input type='file' id='thumbnail' name='thumbnail' accept='image/*' onChange={handleFileChange} />
          </p>

          <p className='submit'>
            <input type='submit' className='primary-btn' value='등록' />
          </p>
        </form>
      </div>
    </div>
  );
}
