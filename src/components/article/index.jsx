import React, { useState } from 'react'
import Search from './search'   
import ArticleSection from './ArticleSection'

function Article() {
  const [selectedCategory, setSelectedCategory] = useState("highlight")
  //สร้าง useState สำหรับ search query
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div>
      <Search 
        category={selectedCategory} 
        onCategoryChange={setSelectedCategory}
        //ส่ง search query ไปยัง ArticleSection
        searchQuery={searchQuery}
        //ส่ง search query ไปยัง ArticleSection
        onSearchChange={setSearchQuery}
      />
      <ArticleSection   
        //ส่ง search query ไปยัง ArticleSection
        category={selectedCategory}
        //ส่ง search query ไปยัง ArticleSection
        searchQuery={searchQuery}
      />
    </div>
  )
}
export default Article