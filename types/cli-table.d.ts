import { Style } from 'colorette'

export interface ITableStyle {
  columnNames: string[]
  borderStyle: Style[]
  textStyle: Style[]
}

export interface ICLITableOptions extends ITableStyle {
  tableEntryMaxWidth: number
}