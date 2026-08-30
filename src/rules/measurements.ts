export type MeasurementUnit='squares'|'yards'|'meters'|'feet'

export const MEASUREMENT_OPTIONS:Array<{value:MeasurementUnit;label:string}>=[
  {value:'squares',label:'Squares'},
  {value:'yards',label:'Yards'},
  {value:'meters',label:'Meters'},
  {value:'feet',label:'Feet'},
]

export function normalizeMeasurement(value:unknown):MeasurementUnit{
  return ['squares','yards','meters','feet'].includes(String(value))?value as MeasurementUnit:'squares'
}

export function currentMeasurement():MeasurementUnit{
  if(typeof document==='undefined')return'squares'
  return normalizeMeasurement(document.documentElement.dataset.measurement)
}

export function convertSquares(value:number,unit:MeasurementUnit){
  const squares=Math.max(0,Number(value)||0)
  const converted=unit==='feet'?squares*3:squares
  return Math.ceil(converted)
}

function unitLabel(unit:MeasurementUnit,value:number){
  if(unit==='squares')return value===1?'square':'squares'
  if(unit==='yards')return value===1?'yard':'yards'
  if(unit==='meters')return value===1?'meter':'meters'
  return value===1?'foot':'feet'
}

export function formatMeasurementToken(squareValue:number,unit=currentMeasurement()){
  const value=convertSquares(squareValue,unit)
  return`[${value}] ${unitLabel(unit,value)}`
}

export function formatMeasurementText(value:string,unit=currentMeasurement()){
  return String(value||'').replace(/\[(\d+(?:\.\d+)?)\]\s*squares?/gi,(_match,raw)=>formatMeasurementToken(Number(raw),unit))
}
