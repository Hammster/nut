import kleur from 'kleur'

export interface ITextStyle {
    indention: number,
    padding: boolean;
    styles: typeof kleur.bgBlack[]
}

export interface ICLILogDefaultOptions {
  seperatorCharacter: string,
  seperatorLength: number,
}