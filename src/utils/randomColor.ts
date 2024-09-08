const colors: any = {
  'meta-1': '#DC3545',
  'meta-2': '#ff7976',
  'meta-3': '#10B981',
  'meta-4': '#313D4A',
  'meta-5': '#259AE6',
  'meta-6': '#FFBA00',
  'meta-7': '#FF6766',
  'meta-8': '#F0950C',
  'meta-9': '#5c7099',
  'meta-10': '#0FADCF',
  success: '#219653',
  danger: '#D34053',
  warning: '#FFA70B',
}

export function getColorAndInitial(name: string) {
  const initial = name.charAt(0)
  const colorKeys = Object.keys(colors)
  const color = colors[colorKeys[Math.floor(Math.random() * colorKeys.length)]]

  return { color, initial }
}
