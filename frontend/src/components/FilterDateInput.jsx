import { useEffect, useRef, useState } from 'react'

const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

const formatFilterDate = (isoDate) => {
  if (!isoDate) return ''
  const date = new Date(`${isoDate}T00:00:00`)
  if (Number.isNaN(date.getTime())) return ''
  return `${MONTH_NAMES[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
}

const formatFilterDateEdit = (isoDate) => {
  if (!isoDate) return ''
  const date = new Date(`${isoDate}T00:00:00`)
  if (Number.isNaN(date.getTime())) return ''
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()
  return `${day}/${month}/${year}`
}

const normalizeTypedDate = (value) => {
  const digits = `${value || ''}`.replace(/\D/g, '').slice(0, 8)
  if (digits.length <= 2) return digits
  if (digits.length <= 4) return `${digits.slice(0, 2)}/${digits.slice(2)}`
  return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`
}

const parseTypedDate = (value) => {
  const match = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(`${value || ''}`.trim())
  if (!match) return null
  const day = Number(match[1])
  const month = Number(match[2])
  const year = Number(match[3])
  if (!Number.isInteger(day) || !Number.isInteger(month) || !Number.isInteger(year)) return null
  if (month < 1 || month > 12 || day < 1 || day > 31) return null

  const date = new Date(Date.UTC(year, month - 1, day))
  if (date.getUTCFullYear() !== year || date.getUTCMonth() !== month - 1 || date.getUTCDate() !== day) return null
  return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`
}

function FilterDateInput({ id, value, onChange, placeholder = 'MM/DD/YYYY' }) {
  const pickerRef = useRef(null)
  const [displayValue, setDisplayValue] = useState(() => formatFilterDate(value))

  const openPicker = () => {
    pickerRef.current?.showPicker?.()
    pickerRef.current?.focus?.()
  }

  useEffect(() => {
    setDisplayValue(formatFilterDate(value))
  }, [value])

  const commitTypedValue = () => {
    const typedValue = `${displayValue || ''}`.trim()
    if (!typedValue) {
      onChange('')
      setDisplayValue('')
      return
    }

    const parsedIso = parseTypedDate(typedValue)
    if (!parsedIso) {
      setDisplayValue(formatFilterDate(value))
      return
    }

    onChange(parsedIso)
    setDisplayValue(formatFilterDate(parsedIso))
  }

  return (
    <div className="filter-date-input">
      <input
        id={`${id}-display`}
        type="text"
        className="filter-date-display"
        value={displayValue}
        placeholder={placeholder}
        onChange={(event) => setDisplayValue(normalizeTypedDate(event.target.value))}
        onFocus={() => setDisplayValue(formatFilterDateEdit(value))}
        onBlur={commitTypedValue}
      />
      <button type="button" className="filter-date-btn" onClick={openPicker} aria-label="Open date picker">
        &#128197;
      </button>
      <input
        ref={pickerRef}
        id={id}
        type="date"
        className="birthdate-picker-hidden"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        tabIndex={-1}
        aria-hidden="true"
      />
    </div>
  )
}

export default FilterDateInput
