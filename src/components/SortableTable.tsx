import React, { FC, ReactElement, useEffect, useState } from 'react'
import './SortableTable.css'

export interface Cell {
  displayValue: string
  sortableValue: string | number
  isImg: boolean
}

export enum SortOrder {
  ASCENDING = 'asc',
  DESCENDING = 'desc'
}

interface SortableTableProps {
  columnNames: string[]
  defaultRows: Cell[][]
  defaultSortIndex: number
  defaultSortOrder: SortOrder
}

const SortableTable: FC<SortableTableProps> = ({ columnNames, defaultRows, defaultSortIndex, defaultSortOrder }): ReactElement => {
  const [rows, setRows] = useState(defaultRows)

  const [sortOrder, setSortOrder] = useState<SortOrder>(defaultSortOrder)
  const [sortIndex, setSortIndex] = useState(defaultSortIndex)
  useEffect(() => {
    if (sortOrder === SortOrder.DESCENDING) {
      setRows([...rows.sort((a, b) => {
        if (a[sortIndex].sortableValue === b[sortIndex].sortableValue) return 0
        return a[sortIndex].sortableValue > b[sortIndex].sortableValue ? 1 : -1
      })])
    } else {
      setRows([...rows.sort((a, b) => {
        if (a[sortIndex].sortableValue === b[sortIndex].sortableValue) return 0
        return b[sortIndex].sortableValue > a[sortIndex].sortableValue ? 1 : -1
      })])
    }
  }, [sortOrder, sortIndex])
  const getSortIcon = (index: number): string | undefined => {
    if (sortIndex !== index) return undefined
    return sortOrder === SortOrder.ASCENDING ? '👇' : '👆'
  }
  const updateSortIndexAndSortOrder = (index: number): void => {
    if (sortIndex !== index) {
      setSortIndex(index)
    } else {
      if (sortOrder === SortOrder.DESCENDING) {
        setSortOrder(SortOrder.ASCENDING)
      } else {
        setSortOrder(SortOrder.DESCENDING)
      }
    }
  }
  return (
    <table className='table'>
      <thead className='header'>
        <tr>
          {columnNames.map((col, i) => (
            <th key={i}>
              <button onClick={() => updateSortIndexAndSortOrder(i)}>
                {col}
              </button>
              {getSortIcon(i)}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i}>
            {row.map((cell, j) => {
              if (cell.isImg) {
                return (
                  <td key={`${i}${j}`}>
                    <img src={cell.displayValue} />
                  </td>
                )
              }
              return (
                <td key={`${i}${j}`}>
                  {cell.displayValue}
                </td>
              )
            })}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default SortableTable
