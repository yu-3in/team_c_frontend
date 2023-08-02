import React from 'react'
import styles from '../styles/profile.module.css'
import { Layout } from '../components/Layout/Layout'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

const Profile = () => {
  // ジャンルのサンプルデータ
  const genreSample = [
    { name: 'フロントエンド', score: 90 },
    { name: 'API', score: 85 },
    { name: 'バックエンド', score: 70 },
    { name: 'バックエンド', score: 78 },
    { name: 'バックエンド', score: 60 },
  ]

  // 絞り込み関数

  // Highchartsのオプション設定
  const options = {
    chart: {
      type: 'column',
    },
    title: {
      text: '',
    },
    xAxis: {
      categories: genreSample.map((item) => item.name),
      labels: {
        style: {
          fontSize: '14px',
        },
      },
    },
    yAxis: {
      title: {
        text: '',
      },
      labels: {
        style: {
          fontSize: '12px',
          color: '#636366',
        },
      },
      plotLines: [
        {
          value: 0, // 点数が0の位置にプロットラインを追加
          color: '#e4e4e4', // 点数が0の位置の横線の色を赤色に設定
          width: 1,
          zIndex: 5,
        },
      ],
      gridLineColor: '#e4e4e4',
    },

    legend: {
      enabled: false,
    },
    series: [
      {
        name: 'スコア',
        data: genreSample.map((item) => item.score),
      },
    ],
    credits: {
      enabled: false,
    },
    plotOptions: {
      column: {
        // 棒の色を変更
        // color: 'blue',
      },
    },
  }

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
              <div className="w-full">
                <HighchartsReact highcharts={Highcharts} options={options} />
              </div>
              <div className="h-32 w-full rounded-md bg-[#F3E4FA]"></div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}

export default Profile
