export const minus = 'menos'

export const auxiliar = new Map<number, string>([
	[1, 'mil'],
])

const units = new Map<string, string>([
	['0', 'zero'],
	['1', 'um'],
	['2', 'dois'],
	['3', 'tres'],
	['4', 'quatro'],
	['5', 'cinco'],
	['6', 'seis'],
	['7', 'sete'],
	['8', 'oito'],
	['9', 'nove'],
])

const tens = new Map<string, string>([
	['2', 'vinte'],
	['3', 'trinta'],
	['4', 'quarenta'],
	['5', 'ciquenta'],
	['6', 'sessenta'],
	['7', 'setenta'],
	['8', 'oitenta'],
	['9', 'noventa'],
	['10', 'dez'],
	['11', 'onze'],
	['12', 'doze'],
	['13', 'treze'],
	['14', 'quatorze'],
	['15', 'quinze'],
	['16', 'dezesseis'],
	['17', 'dezessete'],
	['18', 'dezoito'],
	['19', 'dezenove'],
	['20', 'vinte'],
	['30', 'trinta'],
	['40', 'quarenta'],
	['50', 'ciquenta'],
	['60', 'sessenta'],
	['70', 'setenta'],
	['80', 'oitenta'],
	['90', 'noventa'],
])

const hundreds = new Map<string, string>([
	['100', 'cem'],
	['1', 'cento'],
	['2', 'duzentos'],
	['3', 'trezentos'],
	['4', 'quatrocentos'],
	['5', 'quinhetos'],
	['6', 'seiscentos'],
	['7', 'setecentos'],
	['8', 'oitocentos'],
	['9', 'novecentos'],
	['200', 'duzentos'],
	['300', 'trezentos'],
	['400', 'quatrocentos'],
	['500', 'quinhetos'],
	['600', 'seiscentos'],
	['700', 'setecentos'],
	['800', 'oitocentos'],
	['900', 'novecentos'],
])

const thousands = new Map(units)
thousands.set('1', auxiliar.get(1) as string)
thousands.delete('0')

export const dictionary = new Map<number, Map<string, string>>([
	[1, units],
	[2, tens],
	[3, hundreds],
	[4, thousands],
	[5, tens],
])
