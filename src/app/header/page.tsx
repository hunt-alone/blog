const Page = () => {
  const generateColorPalette = (baseColor: string, steps: number) => {
    const hsl = hexToHsl(baseColor)
    const palette: string[] = []

    for (let i = 0; i < steps; i++) {
      const lightness = (i + 1) * (100 / (steps + 1))
      const newColor = `hsl(${hsl.h}, ${hsl.s}%, ${lightness}%)`
      palette.push(newColor)
    }

    return palette
  }

  const hexToHsl = (hex: string) => {
    hex = hex.replace(/^#/, '')
    if (hex.length === 3) {
      hex = hex
        .split('')
        .map(x => x + x)
        .join('')
    }

    const r = parseInt(hex.substring(0, 2), 16) / 255
    const g = parseInt(hex.substring(2, 4), 16) / 255
    const b = parseInt(hex.substring(4, 6), 16) / 255

    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    let h: number = (max + min) / 2
    let s: number = (max + min) / 2
    const l: number = (max + min) / 2

    if (max === min) {
      h = s = 0
    } else {
      const d = max - min
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min)

      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0)
          break
        case g:
          h = (b - r) / d + 2
          break
        case b:
          h = (r - g) / d + 4
          break
        default:
          break
      }

      h /= 6
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100),
    }
  }

  // 使用示例
  const baseColor = '#3498db'
  const steps = 10
  const palette = generateColorPalette(baseColor, steps)
  console.log(palette)

  return (
    <div className='relative h-dvh w-full bg-white'>
      <div className='navbar-wrapper fixed left-0 top-0 h-16 w-full border-b-2 border-cyan-400'></div>
      <div className='aaa absolute left-0 top-0 h-dvh w-full overflow-scroll pt-16'>
        <h1>asdasdasdasdadsadasdasdasdasdadsadasdasdasdasdadsadasdasdasdasdadsadasdasdasdasdadsadasdasdasdasdadsadasdasdasdasdadsadasdasdasdasdadsad</h1>
        <h1>asdasdasdasdadsadasdasdasdasdadsadasdasdasdasdadsadasdasdasdasdadsadasdasdasdasdadsadasdasdasdasdadsadasdasdasdasdadsadasdasdasdasdadsad</h1>
        <h1>asdasdasdasdadsadasdasdasdasdadsadasdasdasdasdadsadasdasdasdasdadsadasdasdasdasdadsadasdasdasdasdadsadasdasdasdasdadsadasdasdasdasdadsad</h1>
        <h1>asdasdasdasdadsadasdasdasdasdadsadasdasdasdasdadsadasdasdasdasdadsadasdasdasdasdadsadasdasdasdasdadsadasdasdasdasdadsadasdasdasdasdadsad</h1>
        <h1>asdasdasdasdadsadasdasdasdasdadsadasdasdasdasdadsadasdasdasdasdadsadasdasdasdasdadsadasdasdasdasdadsadasdasdasdasdadsadasdasdasdasdadsad</h1>
        <h1>asdasdasdasdadsadasdasdasdasdadsadasdasdasdasdadsadasdasdasdasdadsadasdasdasdasdadsadasdasdasdasdadsadasdasdasdasdadsadasdasdasdasdadsad</h1>
        <h1>asdasdasdasdadsadasdasdasdasdadsadasdasdasdasdadsadasdasdasdasdadsadasdasdasdasdadsadasdasdasdasdadsadasdasdasdasdadsadasdasdasdasdadsad</h1>
        <h1>asdasdasdasdadsadasdasdasdasdadsadasdasdasdasdadsadasdasdasdasdadsadasdasdasdasdadsadasdasdasdasdadsadasdasdasdasdadsadasdasdasdasdadsad</h1>
        <h1>asdasdasdasdadsadasdasdasdasdadsadasdasdasdasdadsadasdasdasdasdadsadasdasdasdasdadsadasdasdasdasdadsadasdasdasdasdadsadasdasdasdasdadsad</h1>
        <h1>asdasdasdasdadsadasdasdasdasdadsadasdasdasdasdadsadasdasdasdasdadsadasdasdasdasdadsadasdasdasdasdadsadasdasdasdasdadsadasdasdasdasdadsad</h1>
        <h1>asdasdasdasdadsadasdasdasdasdadsadasdasdasdasdadsadasdasdasdasdadsadasdasdasdasdadsadasdasdasdasdadsadasdasdasdasdadsadasdasdasdasdadsad</h1>
        <h1>asdasdasdasdadsadasdasdasdasdadsadasdasdasdasdadsadasdasdasdasdadsadasdasdasdasdadsadasdasdasdasdadsadasdasdasdasdadsadasdasdasdasdadsad</h1>
        <h1>asdasdasdasdadsadasdasdasdasdadsadasdasdasdasdadsadasdasdasdasdadsadasdasdasdasdadsadasdasdasdasdadsadasdasdasdasdadsadasdasdasdasdadsad</h1>
        <h1>asdasdasdasdadsadasdasdasdasdadsadasdasdasdasdadsadasdasdasdasdadsadasdasdasdasdadsadasdasdasdasdadsadasdasdasdasdadsadasdasdasdasdadsad</h1>
        <h1>asdasdasdasdadsadasdasdasdasdadsadasdasdasdasdadsadasdasdasdasdadsadasdasdasdasdadsadasdasdasdasdadsadasdasdasdasdadsadasdasdasdasdadsad</h1>
        <h1>asdasdasdasdadsadasdasdasdasdadsadasdasdasdasdadsadasdasdasdasdadsadasdasdasdasdadsadasdasdasdasdadsadasdasdasdasdadsadasdasdasdasdadsad</h1>
        <h1>asdasdasdasdadsadasdasdasdasdadsadasdasdasdasdadsadasdasdasdasdadsadasdasdasdasdadsadasdasdasdasdadsadasdasdasdasdadsadasdasdasdasdadsad</h1>
        <h1>asdasdasdasdadsadasdasdasdasdadsadasdasdasdasdadsadasdasdasdasdadsadasdasdasdasdadsadasdasdasdasdadsadasdasdasdasdadsadasdasdasdasdadsad</h1>
        <h1>asdasdasdasdadsadasdasdasdasdadsadasdasdasdasdadsadasdasdasdasdadsadasdasdasdasdadsadasdasdasdasdadsadasdasdasdasdadsadasdasdasdasdadsad</h1>
        <h1>asdasdasdasdadsadasdasdasdasdadsadasdasdasdasdadsadasdasdasdasdadsadasdasdasdasdadsadasdasdasdasdadsadasdasdasdasdadsadasdasdasdasdadsad</h1>
        <h1>asdasdasdasdadsadasdasdasdasdadsadasdasdasdasdadsadasdasdasdasdadsadasdasdasdasdadsadasdasdasdasdadsadasdasdasdasdadsadasdasdasdasdadsad</h1>
        <h1>asdasdasdasdadsadasdasdasdasdadsadasdasdasdasdadsadasdasdasdasdadsadasdasdasdasdadsadasdasdasdasdadsadasdasdasdasdadsadasdasdasdasdadsad</h1>
        <h1>asdasdasdasdadsadasdasdasdasdadsadasdasdasdasdadsadasdasdasdasdadsadasdasdasdasdadsadasdasdasdasdadsadasdasdasdasdadsadasdasdasdasdadsad</h1>
        <h1>asdasdasdasdadsadasdasdasdasdadsadasdasdasdasdadsadasdasdasdasdadsadasdasdasdasdadsadasdasdasdasdadsadasdasdasdasdadsadasdasdasdasdadsad</h1>
        <h1>asdasdasdasdadsadasdasdasdasdadsadasdasdasdasdadsadasdasdasdasdadsadasdasdasdasdadsadasdasdasdasdadsadasdasdasdasdadsadasdasdasdasdadsad</h1>
        <h1>asdasdasdasdadsadasdasdasdasdadsadasdasdasdasdadsadasdasdasdasdadsadasdasdasdasdadsadasdasdasdasdadsadasdasdasdasdadsadasdasdasdasdadsad</h1>
        <h1>asdasdasdasdadsadasdasdasdasdadsadasdasdasdasdadsadasdasdasdasdadsadasdasdasdasdadsadasdasdasdasdadsadasdasdasdasdadsadasdasdasdasdadsad</h1>
        <h1>asdasdasdasdadsadasdasdasdasdadsadasdasdasdasdadsadasdasdasdasdadsadasdasdasdasdadsadasdasdasdasdadsadasdasdasdasdadsadasdasdasdasdadsad</h1>
        <h1>asdasdasdasdadsadasdasdasdasdadsadasdasdasdasdadsadasdasdasdasdadsadasdasdasdasdadsadasdasdasdasdadsadasdasdasdasdadsadasdasdasdasdadsad</h1>
        <h1>asdasdasdasdadsadasdasdasdasdadsadasdasdasdasdadsadasdasdasdasdadsadasdasdasdasdadsadasdasdasdasdadsadasdasdasdasdadsadasdasdasdasdadsad</h1>
        <h1>asdasdasdasdadsadasdasdasdasdadsadasdasdasdasdadsadasdasdasdasdadsadasdasdasdasdadsadasdasdasdasdadsadasdasdasdasdadsadasdasdasdasdadsad</h1>
        <h1>asdasdasdasdadsad</h1>
        <h1>asdasdasdasdadsad</h1>
        <h1>asdasdasdasdadsad</h1>
        <h1>asdasdasdasdadsad</h1>
        <h1>asdasdasdasdadsad</h1>
        <h1>asdasdasdasdadsad</h1>

        <h1>asdasdasdasdadsad</h1>
        <h1>asdasdasdasdadsad</h1>
        <h1>asdasdasdasdadsad</h1>

        <h1>asdasdasdasdadsad</h1>
        <h1>asdasdasdasdadsad</h1>
        <h1>asdasdasdasdadsad</h1>
        <h1>asdasdasdasdadsad</h1>
        <h1>asdasdasdasdadsad</h1>
        <h1>asdasdasdasdadsad</h1>
        <h1>asdasdasdasdadsad</h1>
        <h1>asdasdasdasdadsad</h1>
        <h1>asdasdasdasdadsad</h1>
        <h1>asdasdasdasdadsad</h1>
        <h1>asdasdasdasdadsad</h1>
        <h1>asdasdasdasdadsad</h1>
        <h1>asdasdasdasdadsad</h1>
        <h1>asdasdasdasdadsad</h1>
        <h1>asdasdasdasdadsad</h1>
        <h1>asdasdasdasdadsad</h1>
        <h1>asdasdasdasdadsad</h1>
        <h1>asdasdasdasdadsad</h1>
        <h1>asdasdasdasdadsad</h1>
        <h1>asdasdasdasdadsad</h1>

        <h1>asdasdasdasdadsad</h1>
        <h1>asdasdasdasdadsad</h1>
        <h1>asdasdasdasdadsad</h1>

        <h1>asdasdasdasdadsad</h1>
        <h1>asdasdasdasdadsad</h1>
        <h1>asdasdasdasdadsad</h1>
        <h1>asdasdasdasdadsad</h1>
        <h1>asdasdasdasdadsad</h1>
        <h1>asdasdasdasdadsad</h1>
        <h1>asdasdasdasdadsad</h1>
        <h1>asdasdasdasdadsad</h1>
        <h1>asdasdasdasdadsad</h1>
        <h1>asdasdasdasdadsad</h1>
        <h1>asdasdasdasdadsad</h1>
        <h1>asdasdasdasdadsad</h1>
        <h1>asdasdasdasdadsad</h1>
        <h1>asdasdasdasdadsad</h1>
        <h1>asdasdasdasdadsad</h1>
        <h1>asdasdasdasdadsad</h1>
        <h1>asdasdasdasdadsad</h1>
        <h1>asdasdasdasdadsad</h1>
        <h1>asdasdasdasdadsad</h1>
        <h1>asdasdasdasdadsad</h1>

        <h1>asdasdasdasdadsad</h1>
        <h1>asdasdasdasdadsad</h1>
        <h1>asdasdasdasdadsad</h1>

        <h1>asdasdasdasdadsad</h1>
        <h1>asdasdasdasdadsad</h1>
        <h1>asdasdasdasdadsad</h1>
        <h1>asdasdasdasdadsad</h1>
        <h1>asdasdasdasdadsad</h1>
        <h1>asdasdasdasdadsad</h1>
        <h1>asdasdasdasdadsad</h1>
        <h1>asdasdasdasdadsad</h1>
        <h1>asdasdasdasdadsad</h1>
        <h1>asdasdasdasdadsad</h1>
        <h1>asdasdasdasdadsad</h1>
        <h1>asdasdasdasdadsad</h1>
        <h1>asdasdasdasdadsad</h1>
        <h1>asdasdasdasdadsad</h1>
        <h1>asdasdasdasdadsad</h1>
        <h1>asdasdasdasdadsad</h1>
        <h1>asdasdasdasdadsad</h1>
        <h1>asdasdasdasdadsad</h1>
        <h1>asdasdasdasdadsad</h1>
        <h1>asdasdasdasdadsad</h1>

        <h1>asdasdasdasdadsad</h1>
        <h1>asdasdasdasdadsad</h1>
        <h1>asdasdasdasdadsad</h1>

        <h1>asdasdasdasdadsad</h1>
        <h1>asdasdasdasdadsad</h1>
        <h1>asdasdasdasdadsad</h1>
        <h1>asdasdasdasdadsad</h1>
        <h1>asdasdasdasdadsad</h1>
        <h1>asdasdasdasdadsad</h1>
        <h1>asdasdasdasdadsad</h1>
        <h1>asdasdasdasdadsad</h1>
        <h1>asdasdasdasdadsad</h1>
        <h1>asdasdasdasdadsad</h1>
        <h1>asdasdasdasdadsad</h1>
        <h1>asdasdasdasdadsad</h1>
        <h1>asdasdasdasdadsad</h1>
        <h1>asdasdasdasdadsad</h1>
        <h1>asdasdasdasdadsad</h1>
        <h1>asdasdasdasdadsad</h1>
        <h1>asdasdasdasdadsad</h1>
        <h1>asdasdasdasdadsad</h1>
        <h1>asdasdasdasdadsad</h1>
        <h1>asdasdasdasdadsad</h1>

        <h1>asdasdasdasdadsad</h1>
        <h1>asdasdasdasdadsad</h1>
        <h1>asdasdasdasdadsad</h1>

        <h1>asdasdasdasdadsad</h1>
        <h1>asdasdasdasdadsad</h1>
        <h1>asdasdasdasdadsad</h1>
        <h1>asdasdasdasdadsad</h1>
        <h1>asdasdasdasdadsad</h1>
        <h1>asdasdasdasdadsad</h1>
        <h1>asdasdasdasdadsad</h1>
        <h1>asdasdasdasdadsad</h1>
        <h1>asdasdasdasdadsad</h1>
        <h1>asdasdasdasdadsad</h1>
        <h1>asdasdasdasdadsad</h1>
        <h1>asdasdasdasdadsad</h1>
        <h1>asdasdasdasdadsad</h1>
      </div>
    </div>
  )
}

export default Page
