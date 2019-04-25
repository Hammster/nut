import { ICLITableOptions, ITableStyle } from '../../types/cli-table'

import { log } from './log'
import { applyStyle, style } from './util'

const defaultOptions: ICLITableOptions = {
  borderStyle: [],
  columnNames: [],
  tableEntryMaxWidth: 16,
  textStyle: [style.white]
}

const defaultTableStyle: ITableStyle = {
  borderStyle: defaultOptions.borderStyle,
  columnNames: defaultOptions.columnNames,
  textStyle: defaultOptions.textStyle
}

let options: ICLITableOptions = { ...defaultOptions }
let tabelHorizontal = ''
let safeStringLength = 0

enum TableChars {
  HeadStart = '┌',
  HeadEnd = '┐',
  RowStart = '├',
  RowEnd = '┤',
  FooterStart = '└',
  FooterEnd = '┘',
  HorizontalLine = '─',
  VerticalLine = '│',
  JoinDown = '┬',
  JoinUp = '┴',
  JoinLeft = '┤',
  JoinRight = '├',
  Join = '┼'
}

setOption()

function setOption (overrideOptions: Partial<ICLITableOptions> = {}) {
  options = { ...options, ...overrideOptions }
  tabelHorizontal = TableChars.HorizontalLine.repeat(options.tableEntryMaxWidth)
  safeStringLength = options.tableEntryMaxWidth - 3
}

export function logTable (data: any[] | Map<any, any> | Set<any> = [], overloadTableStyle: Partial<ITableStyle> = {}) {
  const tableStyle: ITableStyle = { ...defaultTableStyle, ...overloadTableStyle }
  let workingData: any[]

  if (data instanceof Set) {
    workingData = [...data]
  } else if (data instanceof Map) {
    workingData = [...data.values()]
  } else {
    workingData = data
  }

  const rowCount = workingData.length
  let cellCount = tableStyle.columnNames.length

  if (cellCount === 0) {
    tableStyle.columnNames = Object.keys(workingData.reduce((result, obj) => {
      return Object.assign(result, obj)
    }, {}))

    cellCount = tableStyle.columnNames.length
  }

  const trimedCellCount = cellCount > 0 ? cellCount - 1 : 0

  let table = ''
  makeHeader()

  workingData.forEach((dataRow: any[] | string, index) => {
    makeRow()
    makeCells(dataRow)
    if (index === workingData.length - 1) {
      makeFooter()
    }
  })

  function makeHeader () {
    table += TableChars.HeadStart + tabelHorizontal
    table += (TableChars.JoinDown + tabelHorizontal).repeat(trimedCellCount) + TableChars.HeadEnd + '\n'
    makeCells(tableStyle.columnNames)
  }

  function makeRow () {
    table += TableChars.JoinRight + tabelHorizontal
    table += (TableChars.Join + tabelHorizontal).repeat(trimedCellCount) + TableChars.JoinLeft + '\n'
  }

  function makeFooter () {
    table += TableChars.FooterStart + tabelHorizontal
    table += (TableChars.JoinUp + tabelHorizontal).repeat(trimedCellCount) + TableChars.FooterEnd + '\n'
  }

  function makeCells (cellData: any) {
    let isHead = false
    if (tableStyle.columnNames === cellData) {
      isHead = true
      cellData = tableStyle.columnNames.reduce((accumulator: any, currentValue) => {
        accumulator[currentValue] = currentValue
        return accumulator
      }, {})
    }

    tableStyle.columnNames.forEach((columnProperty: string) => {
      const val = cellData[columnProperty] || ''
      const text = val.toString()
      const fillchar = text.length >= safeStringLength ? '.' : ' '

      table += TableChars.VerticalLine
      const formatted = text.substring(0, safeStringLength).padEnd(options.tableEntryMaxWidth, fillchar)
      // tslint:disable-next-line:max-line-length
      table += isHead ? applyStyle(formatted, { styles: [style.bgWhite, style.black] }) : applyStyle(formatted, { styles: tableStyle.textStyle })
    })

    table += TableChars.VerticalLine + '\n'
  }

  log(table, { styles: tableStyle.borderStyle })
}
