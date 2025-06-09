import React from 'react'

const FilterSortBar = ({ filterYear, setFilterYear, availableYears, filterGenre, setFilterGenre, availableGenres }) => {
  return (
    <div className="flex flex-wrap gap-4 mb-6 items-center justify-between bg-dark-100 p-4 rounded-xl shadow-inner">
      <div className="flex gap-2 items-center">
        <label className="text-white font-medium">Year:</label>
        <select
          className="bg-gray-900 text-white rounded px-2 py-1"
          value={filterYear}
          onChange={e => setFilterYear(e.target.value)}
        >
          <option value="">All</option>
          {availableYears.map(y => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>
      </div>
      <div className="flex gap-2 items-center">
        <label className="text-white font-medium">Genre:</label>
        <select
          className="bg-gray-900 text-white rounded px-2 py-1"
          value={filterGenre}
          onChange={e => setFilterGenre(e.target.value)}
        >
          <option value="">All</option>
          {availableGenres.map(g => (
            <option key={g.id} value={g.id}>{g.name}</option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default FilterSortBar
