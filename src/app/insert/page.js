'use client';

import { createClient } from '../utils/supabase/client';
import { useEffect, useState } from 'react';
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
  const [user, setUser] = useState(null);
  const [authForm, setAuthform] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    //즉시 실행 함수
    (async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    })();
  }, [supabase.auth]);

  async function insertData(e) {
    e.preventDefault();
    const { error } = await supabase.from('portfolio').insert(formData);
    if (error) {
      console.log(error);
    } else {
      console.log('데이터 입력 성공');
      router.push('/');
      router.refresh();
    }
    // 파일 업로드
    if (thumbnail) {
      await uploadThumbnail(thumbnail);
    }
  }

  const handleChange = e => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };
  const handleAuthChange = e => {
    const { name, value } = e.target;

    setAuthform(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = e => {
    setThumbnail(e.target.files[0]);
  };

  async function uploadThumbnail(file) {
    const { data, error } = await supabase.storage.from('portfolio').upload(`thumbnail/${file.name}`, file);
    if (error) {
      // Handle error
      console.error('파일 업로드 실패', error);
    } else {
      // Handle success
      console.log('파일 업로드 성공');
    }
  }

  //로그인 진행
  const handleLogin = async e => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signInWithPassword(authForm);
    if (error) {
      alert('로그인 실패', error.message);
    } else {
      alert('로그인 성공');
      setUser(data.user);
      router.refresh();
    }
  };

  if (!user) {
    return (
      <>
        <div className='about_content shadow'>
          <h2>관리자 로그인</h2>
          <div className='contact_form'>
            <form onSubmit={handleLogin}>
              <p className='field'>
                <label htmlFor='email'>이메일</label>
                <input type='email' id='email' name='email' placeholder='이메일' required onChange={handleAuthChange} />
              </p>
              <p className='field'>
                <label htmlFor='password'>비밀번호</label>
                <input
                  type='password'
                  id='password'
                  name='password'
                  placeholder='비밀번호'
                  required
                  onChange={handleAuthChange}
                />
              </p>
              <p className='submit'>
                <input type='submit' className='primary-btn' value='로그인' />
              </p>
            </form>
          </div>
        </div>
      </>
    );
  }

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
