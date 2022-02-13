import { useEffect, useRef } from 'react'
import SvgGauge, { GaugeOptions, GaugeInstance } from 'svg-gauge'

const Gauge = ({ value }: Props) => {
  const gaugeEl = useRef<HTMLDivElement>(null)
  const gaugeRef = useRef<GaugeInstance | null>(null)
  useEffect(() => {
    if (!gaugeRef.current) {
      if (!gaugeEl.current) return
      // #334455 : #F32450
      const options: GaugeOptions = { label: (val: number) => Number(val).toFixed(0) + '%', color: value => (value < 30 ? '#334455' : '#d0d0d0') }
      gaugeRef.current = SvgGauge(gaugeEl.current, options)
      gaugeRef.current?.setValue(1)
    }
    gaugeRef.current?.setValueAnimated(value, 1)
  }, [value])

  return (
      <div ref={gaugeEl} />
  )
}

interface Props {
  value: number
}

export default Gauge