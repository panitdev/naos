import { AVATAR_GRADIENTS, type AvatarTone } from '@/lib/drive-data'

interface AvatarProps {
  name: string
  tone?: AvatarTone
  size?: number
}

export function Avatar({ name, tone = 'p', size = 28 }: AvatarProps) {
  const initials = name
    .split(' ')
    .slice(0, 2)
    .map((s) => s[0])
    .join('')
    .toUpperCase()

  return (
    <span
      style={{
        width: size,
        height: size,
        background: AVATAR_GRADIENTS[tone] ?? AVATAR_GRADIENTS.p,
        fontSize: size === 28 ? 11 : 10,
      }}
      className="inline-flex shrink-0 items-center justify-center rounded-full font-medium text-white"
    >
      {initials}
    </span>
  )
}
