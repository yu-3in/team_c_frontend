import React from 'react'
import styles from '../styles/profile.module.css'
import { Layout } from '../components/Layout/Layout'

const Profile = () => {
  return (
    <>
      <Layout>
        <div className={styles.contents}>
          <div className={styles.wrapper}>
            <div className={styles.profile}>
              <div className={styles.profileContents}>
                <div className="h-40 w-40 rounded-full bg-gray-500"></div>
                <h1 className="my-5 border-b border-gray-300 pb-4 text-2xl">名前 なまえ</h1>
                <div className="flex items-center">
                  <div className="mr-3 h-9 w-9 rounded-full bg-gray-500"></div>
                  <div>
                    <p className="text-xs text-[#636366]">プロダクト</p>
                    <p className="text-sm">お名前ドットコム</p>
                  </div>
                </div>
                <div className="mt-3 flex items-center">
                  <div className="mr-3 h-9 w-9 rounded-full bg-gray-500"></div>
                  <div>
                    <p className="text-xs text-[#636366]">ジャンル</p>
                    <p className="text-sm">フロントエンド</p>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.data}>
              <div className="flex w-full justify-end gap-2.5">
                <select name="" id="">
                  <option value="サンプル1">絞り込み</option>
                </select>
                <select name="" id="">
                  <option value="サンプル1">絞り込み</option>
                </select>
              </div>
              <div className="w-full">{/* ここにグラフ */}</div>
              <div className="h-32 w-full rounded-md bg-[#F3E4FA]"></div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}

export default Profile
