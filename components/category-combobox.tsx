"use client"

import * as React from "react"
import { Check, ChevronsUpDown, Plus } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"

interface Category {
  id: string
  title: string
}

interface CategoryComboboxProps {
  selected: string[]
  setSelected: (cats: string[]) => void
}

export function CategoryCombobox({ selected, setSelected }: CategoryComboboxProps) {
  const [open, setOpen] = React.useState(false)
  const [inputValue, setInputValue] = React.useState("")
  const [categories, setCategories] = React.useState<Category[]>([])
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories')
        const data = await response.json()
        setCategories(data.docs || [])
      } catch (error) {
        console.error('Failed to fetch categories:', error)
        setCategories([])
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])

  const allCategoryTitles = [
    ...categories.map(cat => cat.title),
    ...selected.filter(sel => !categories.find(cat => cat.title === sel))
  ]

  const handleSelect = (category: string) => {
    if (!selected.includes(category)) {
      setSelected([...selected, category])
    }
    setInputValue("")
    setOpen(false)
  }

  const handleCreate = () => {
    const trimmed = inputValue.trim()
    if (trimmed && !selected.includes(trimmed)) {
      setSelected([...selected, trimmed])
    }
    setInputValue("")
    setOpen(false)
  }

  return (
    <div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between bg-zinc-800 border-zinc-700 text-white hover:bg-zinc-800 hover:text-white focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] data-[state=open]:border-ring data-[state=open]:ring-ring/50 data-[state=open]:ring-[3px]"
          >
            <span className={selected.length === 0 ? "text-zinc-500" : ""}>
              {selected.length === 0 ? "Select or create category…" : `Selected (${selected.length})`}
            </span>
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-full p-0 popover-content">
          <Command className="command">
            <CommandInput
              placeholder="Search or create..."
              value={inputValue}
              onValueChange={setInputValue}
              className="h-9"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault()
                  handleCreate()
                }
              }}
            />

            <CommandList>
              <CommandEmpty>
                {loading ? "Loading categories..." : "No category found."}
                {!loading && inputValue.trim() && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="mt-2 w-full flex gap-2 hover:bg-zinc-700"
                    onClick={handleCreate}
                  >
                    <Plus size={15} /> Create "{inputValue}"
                  </Button>
                )}
              </CommandEmpty>

              <CommandGroup>
                {allCategoryTitles.map((catTitle: string) => (
                  <CommandItem
                    key={catTitle}
                    value={catTitle}
                    onSelect={() => handleSelect(catTitle)}
                    className="hover:bg-zinc-700 data-[selected=true]:bg-zinc-700"
                  >
                    {catTitle}
                    <Check
                      className={cn(
                        "ml-auto",
                        selected.includes(catTitle) ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {selected.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {selected.map((cat) => (
            <Badge key={cat} variant="secondary" className="badge">
              {cat}
              <button
                className="ml-2 hover:text-zinc-400"
                onClick={() => setSelected(selected.filter((c) => c !== cat))}
              >
                ×
              </button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  )
}