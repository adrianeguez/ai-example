'use client'

import * as React from 'react'
import { X } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'

export type Option = {
  label: string
  value: string
}

interface MultiSelectProps {
  options: Option[]
  selected: string[]
  onChange: (selected: string[]) => void
  className?: string
  placeholder?: string
}

export function MultiSelect({
  options,
  selected = [],
  onChange,
  className,
  placeholder = 'Select options...',
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false)

  const selectedValues = Array.isArray(selected) ? selected : []

  const handleUnselect = (item: string) => {
    onChange(selectedValues.filter((i) => i !== item))
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div
          role="combobox"
          aria-expanded={open}
          className={cn(
            'w-full border border-input rounded-md min-h-[40px] flex items-center justify-between px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
            className
          )}
        >
          <div className="flex gap-1 flex-wrap">
            {selectedValues.length === 0 && (
              <span className="text-muted-foreground">{placeholder}</span>
            )}
            {selectedValues.map((item) => (
              <Badge
                key={item}
                variant="secondary"
                className="flex items-center gap-1"
              >
                {options.find((option) => option.value === item)?.label}
                <button
                  className="hover:bg-secondary/80 rounded-sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleUnselect(item)
                  }}
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search..." />
          <CommandEmpty>No option found.</CommandEmpty>
          <CommandGroup className="max-h-64 overflow-auto">
            {options.map((option) => (
              <CommandItem
                key={option.value}
                onSelect={() => {
                  onChange(
                    selectedValues.includes(option.value)
                      ? selectedValues.filter((item) => item !== option.value)
                      : [...selectedValues, option.value]
                  )
                }}
              >
                <div
                  className={cn(
                    'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
                    selectedValues.includes(option.value)
                      ? 'bg-primary text-primary-foreground'
                      : 'opacity-50 [&_svg]:invisible'
                  )}
                >
                  <X className="h-3 w-3" />
                </div>
                {option.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
} 