import { Style } from 'colorette'

export interface ITextStyle {
    indention: number
    padding: boolean
    styles: Style[]
}

export interface ICLILogDefaultOptions {
  seperatorCharacter: string
  seperatorLength: number
}