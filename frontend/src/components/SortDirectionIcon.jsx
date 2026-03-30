function SortDirectionIcon({ direction }) {
  return (
    <span className="sort-direction-icon" aria-hidden="true">
      <svg
        className={`sort-direction-svg ${direction}`}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {direction === 'asc' ? (
          <g className="sort-direction-bars">
            <path d="M4 10H9" />
            <path d="M4 18H12" />
            <path d="M4 26H16" />
            <path d="M4 34H20" />
            <path d="M4 42H25" />
          </g>
        ) : (
          <g className="sort-direction-bars">
            <path d="M4 10H25" />
            <path d="M4 18H20" />
            <path d="M4 26H16" />
            <path d="M4 34H12" />
            <path d="M4 42H9" />
          </g>
        )}
        {direction === 'asc' ? (
          <g className="sort-direction-arrow">
            <path d="M37 41V11" />
            <path d="M29 19L37 11L45 19" />
          </g>
        ) : (
          <g className="sort-direction-arrow">
            <path d="M37 11V41" />
            <path d="M29 33L37 41L45 33" />
          </g>
        )}
      </svg>
    </span>
  )
}

export default SortDirectionIcon
