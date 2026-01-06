import React from 'react'
import { Search as SearchIcon } from "lucide-react"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

function Search({ category, onCategoryChange, searchQuery, onSearchChange }) {

  // Function to format category display (capitalize first letter)
  const formatCategory = (value) => {
    if (!value) return ""
    return value.charAt(0).toUpperCase() + value.slice(1)
  }

  // Category options mapping
  const categoryOptions = {
    highlight: "Highlight",
    general: "General",
    cat: "Cat",
    inspiration: "Inspiration"
  }

  // Category options for desktop pills
  const categories = [
    { value: "highlight", label: "Highlight" },
    { value: "general", label: "General" },
    { value: "cat", label: "Cat" },
    { value: "inspiration", label: "Inspiration" }
  ]

  return (
    <div className="w-full flex flex-col items-center">
      {/* Container with max-width 1200px */}
      <div className="w-full max-w-[1200px] px-4 min-[1024px]:px-[120px] min-[1440px]:px-0">
        {/* Latest articles Title Container */}
        <div className="w-full min-h-[64px] p-4 min-[1024px]:p-0 flex items-center gap-[10px]">
          <h2 className="font-sans font-semibold text-[24px] leading-[32px] tracking-[0%] text-brown-600">
            Latest articles
          </h2>
        </div>
      </div>

      {/* Search Container Background - Full width on mobile */}
      <div className="w-full bg-brown-200 min-[1024px]:bg-transparent">
        <div className="w-full max-w-[1200px] mx-auto px-4 min-[1024px]:px-[120px] min-[1440px]:px-0">
          {/* Search Container - Mobile: Vertical, Desktop: Horizontal */}
          <div className="w-full min-h-[172px] min-[1024px]:min-h-[80px] p-4 min-[1024px]:pt-4 min-[1024px]:pr-6 min-[1024px]:pb-4 min-[1024px]:pl-6 min-[1024px]:bg-brown-200 min-[1024px]:rounded-2xl flex flex-col min-[1024px]:flex-row min-[1024px]:items-center min-[1024px]:justify-between gap-4">
        {/* Search Input - Top (Mobile), Right Side (Desktop) */}
        <div className="relative w-full min-[1024px]:w-auto min-[1024px]:shrink-0 order-1 min-[1024px]:order-2">
          <Input 
            type="text" 
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full min-[1024px]:w-[300px] h-12 pt-3 pr-10 pb-3 pl-4 rounded-lg border border-brown-300"
          />
          <SearchIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-brown-400 pointer-events-none" />
        </div>

        {/* Category Filters - Bottom (Mobile), Left Side (Desktop) */}
        {/* Mobile: Category Dropdown */}
        <div className="w-full min-h-[76px] min-[1024px]:hidden flex flex-col gap-1 order-2">
          <label className="font-sans text-body-3 text-brown-400">
            Category
          </label>
          <Select value={category} onValueChange={onCategoryChange}>
            <SelectTrigger className="w-full h-12 rounded-lg">
              <SelectValue placeholder="Select category">
                {categoryOptions[category] || formatCategory(category)}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="highlight">Highlight</SelectItem>
                <SelectItem value="general">General</SelectItem>
                <SelectItem value="cat">Cat</SelectItem>
                <SelectItem value="inspiration">Inspiration</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {/* Desktop: Category Pills - Left Side */}
        <div className="hidden min-[1024px]:flex items-center gap-2 order-1">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => onCategoryChange(cat.value)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap",
                category === cat.value
                  ? "bg-brown-500 text-white"
                  : "bg-transparent text-brown-600 hover:text-brown-500"
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Search