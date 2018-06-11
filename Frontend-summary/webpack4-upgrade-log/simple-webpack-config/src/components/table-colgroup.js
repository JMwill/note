import React from 'react'

export default function TableColGroup(props) {
  const total_width = props.total_width
  const cell_arr = props.cell_width_list
  const styles = {}
  for (let i = 0; i < cell_arr.length; i++) {
    styles['c' + i] = {width: (cell_arr[i] * 100 / total_width) + '%'}
  }

  return (
    <colgroup>
      {cell_arr.map((a, b) => <col key={b} style={styles['c' + b]} />)}
    </colgroup>
  )
}
