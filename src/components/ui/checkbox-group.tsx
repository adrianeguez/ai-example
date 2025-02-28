'use client'

import * as React from 'react'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'

export interface CheckboxOption {
  label: string
  value: string
}

interface CheckboxGroupProps {
  options: CheckboxOption[]
  selected: string[]
  onChange: (selected: string[]) => void
  className?: string
}

export function CheckboxGroup({
  options,
  selected = [],
  onChange,
  className,
}: CheckboxGroupProps) {
  const handleCheckboxChange = (checked: boolean, value: string) => {
    if (checked) {
      onChange([...selected, value])
    } else {
      onChange(selected.filter((item) => item !== value))
    }
  }

  return (
    <div className={`space-y-2 ${className}`}>
      {options.map((option) => (
        <div key={option.value} className="flex items-center space-x-2">
          <Checkbox
            id={option.value}
            checked={selected.includes(option.value)}
            onCheckedChange={(checked) => 
              handleCheckboxChange(checked as boolean, option.value)
            }
          />
          <Label
            htmlFor={option.value}
            className="text-sm font-normal cursor-pointer"
          >
            {option.label}
          </Label>
        </div>
      ))}
    </div>
  )
} 