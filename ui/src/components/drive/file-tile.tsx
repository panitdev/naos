import {
  Folder,
  FileText,
  FileSpreadsheet,
  FileType,
  Image,
  Lock,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import type { FileKind } from '@/lib/drive-data'

interface FileTileProps {
  kind: FileKind
  size?: 32 | 40
  className?: string
}

const kindClass: Record<FileKind, string> = {
  folder: 'ftile--folder',
  pdf:    'ftile--pdf',
  xls:    'ftile--xls',
  doc:    'ftile--doc',
  txt:    'ftile--txt',
  img:    'ftile--img',
}

export function FileTile({ kind, size = 32, className }: FileTileProps) {
  const iconSize = size === 40 ? 22 : 18
  const radius = size === 40 ? 9 : 7

  let icon: React.ReactNode
  switch (kind) {
    case 'folder': icon = <Folder size={iconSize} />; break
    case 'pdf':    icon = <FileType size={iconSize} />; break
    case 'xls':    icon = <FileSpreadsheet size={iconSize} />; break
    case 'doc':    icon = <FileText size={iconSize} />; break
    case 'img':    icon = <Image size={iconSize} />; break
    default:       icon = <Lock size={iconSize} />; break
  }

  return (
    <span
      className={cn('ftile', kindClass[kind], className)}
      style={{ width: size, height: size, borderRadius: radius }}
    >
      {icon}
    </span>
  )
}
