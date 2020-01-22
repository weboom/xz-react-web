import React from 'react'
import './index.css'
import ReactLoading from "react-loading";

export default function () {
  return (
    <div className="inline-loading">
      <ReactLoading height={24} width={24} className="svg" type="spin" color="#333"/>
      <span>加载中...</span>
    </div>
  )
}