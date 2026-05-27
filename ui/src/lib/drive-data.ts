export type FileKind = 'folder' | 'pdf' | 'xls' | 'doc' | 'txt' | 'img'

export type AccessType = 'private' | 'people'

export type PersonRole = 'owner' | 'edit' | 'view'

export type AvatarTone = 'p' | 'a' | 'b' | 'm'

export interface Person {
  name: string
  email: string
  role: PersonRole
  tone: AvatarTone
}

export interface FileLink {
  enabled: boolean
  url: string
  role: 'view' | 'edit'
  expires: string
}

export interface ActivityEntry {
  who: string
  what: string
  time: string
  live: boolean
}

export interface DriveFile {
  id: string
  name: string
  kind: FileKind
  items?: number
  sizeLabel: string
  access: { type: AccessType; count: number; label: string }
  encryption: string
  modified: string
  modifiedFull: string
  created: string
  owner: string
  people: Person[]
  link: FileLink
  activity: ActivityEntry[]
  fingerprint: string
}

export interface NavItem {
  id: string
  label: string
  path: string
  expandable?: boolean
}

export interface Vault {
  id: string
  label: string
  letter: string
  tint: string
}

export const NAOS_NAV: NavItem[] = [
  { id: 'home',    label: 'Home',     path: '/' },
  { id: 'drive',   label: 'My Drive', path: '/' },
  { id: 'shared',  label: 'Shared',   path: '/shared' },
  { id: 'recent',  label: 'Recent',   path: '/recent' },
  { id: 'starred', label: 'Starred',  path: '/starred' },
  { id: 'trash',   label: 'Trash',    path: '/trash' },
]

export const NAOS_VAULTS: Vault[] = [
  { id: 'personal', label: 'Personal', letter: 'P', tint: 'oklch(0.48 0.24 264)' },
  { id: 'finance',  label: 'Finance',  letter: 'F', tint: 'oklch(0.55 0.16 155)' },
  { id: 'work',     label: 'Work',     letter: 'W', tint: 'oklch(0.78 0.13 75)' },
  { id: 'archive',  label: 'Archive',  letter: 'A', tint: 'oklch(0.62 0.10 200)' },
]

export const AVATAR_GRADIENTS: Record<AvatarTone, string> = {
  p: 'linear-gradient(135deg, oklch(0.55 0.20 264), oklch(0.42 0.22 264))',
  a: 'linear-gradient(135deg, oklch(0.78 0.13 75), oklch(0.62 0.15 50))',
  b: 'linear-gradient(135deg, oklch(0.62 0.12 200), oklch(0.48 0.14 220))',
  m: 'linear-gradient(135deg, oklch(0.62 0.04 280), oklch(0.45 0.06 280))',
}

export const NAOS_FILES: DriveFile[] = [
  {
    id: 'projects',
    name: 'Projects',
    kind: 'folder',
    items: 5,
    sizeLabel: '5 items',
    access: { type: 'people', count: 3, label: '3 people' },
    encryption: 'E2EE',
    modified: '2h ago',
    modifiedFull: 'May 17, 2024 · 14:22',
    created: 'Mar 4, 2024',
    owner: 'You',
    people: [
      { name: 'You',       email: 'you@naos.io',       role: 'owner', tone: 'p' },
      { name: 'Jane Park', email: 'jane@studio.co',    role: 'edit',  tone: 'a' },
      { name: 'Alex Kim',  email: 'alex@studio.co',    role: 'view',  tone: 'b' },
      { name: 'Sam Reyes', email: 'sam@studio.co',     role: 'view',  tone: 'm' },
    ],
    link: { enabled: true,  url: 'naos://link/7f3a...c8d2', role: 'view', expires: 'May 25, 2024' },
    activity: [
      { who: 'Jane Park', what: 'opened Budget.xlsx',       time: '2h ago', live: true },
      { who: 'You',       what: 'added Q2_Report_2024.pdf', time: '4d ago', live: false },
      { who: 'Alex Kim',  what: 'left the folder',          time: '1w ago', live: false },
    ],
    fingerprint: 'k1n0 · 9f72 · 8d4a · b3e1',
  },
  {
    id: 'finance',
    name: 'Finance',
    kind: 'folder',
    items: 3,
    sizeLabel: '3 items',
    access: { type: 'private', count: 1, label: 'Only you' },
    encryption: 'E2EE',
    modified: 'Yesterday',
    modifiedFull: 'May 16, 2024 · 18:04',
    created: 'Jan 12, 2024',
    owner: 'You',
    people: [
      { name: 'You', email: 'you@naos.io', role: 'owner', tone: 'p' },
    ],
    link: { enabled: false, url: '', role: 'view', expires: '—' },
    activity: [
      { who: 'You', what: 'rotated vault key', time: 'Yesterday', live: false },
    ],
    fingerprint: '4a2f · 1c8b · e0d9 · 77a3',
  },
  {
    id: 'personal',
    name: 'Personal',
    kind: 'folder',
    items: 2,
    sizeLabel: '2 items',
    access: { type: 'people', count: 2, label: '2 people' },
    encryption: 'E2EE',
    modified: '2 days ago',
    modifiedFull: 'May 15, 2024',
    created: 'Sep 8, 2023',
    owner: 'You',
    people: [
      { name: 'You',      email: 'you@naos.io',          role: 'owner', tone: 'p' },
      { name: 'Mira Cho', email: 'mira@personal.email',  role: 'edit',  tone: 'a' },
    ],
    link: { enabled: false, url: '', role: 'view', expires: '—' },
    activity: [
      { who: 'Mira Cho', what: 'edited Letters.txt', time: '2d ago', live: false },
    ],
    fingerprint: '88c1 · 2e5d · ba07 · 9f44',
  },
  {
    id: 'clients',
    name: 'Clients',
    kind: 'folder',
    items: 4,
    sizeLabel: '4 items',
    access: { type: 'people', count: 4, label: '4 people' },
    encryption: 'E2EE',
    modified: '3 days ago',
    modifiedFull: 'May 14, 2024',
    created: 'Oct 22, 2023',
    owner: 'You',
    people: [
      { name: 'You',       email: 'you@naos.io',    role: 'owner', tone: 'p' },
      { name: 'Jane Park', email: 'jane@studio.co', role: 'edit',  tone: 'a' },
      { name: 'Alex Kim',  email: 'alex@studio.co', role: 'view',  tone: 'b' },
      { name: 'Lee Hoon',  email: 'lee@nori.co',    role: 'view',  tone: 'm' },
    ],
    link: { enabled: false, url: '', role: 'view', expires: '—' },
    activity: [
      { who: 'Alex Kim', what: 'viewed Contract.pdf', time: '3d ago', live: false },
    ],
    fingerprint: '3a7e · 4d12 · cc88 · 02ff',
  },
  {
    id: 'q2report',
    name: 'Q2_Report_2024.pdf',
    kind: 'pdf',
    sizeLabel: '2.4 MB',
    access: { type: 'people', count: 2, label: '2 people' },
    encryption: 'E2EE',
    modified: '4 days ago',
    modifiedFull: 'May 13, 2024 · 09:18',
    created: 'May 12, 2024',
    owner: 'You',
    people: [
      { name: 'You',       email: 'you@naos.io',    role: 'owner', tone: 'p' },
      { name: 'Jane Park', email: 'jane@studio.co', role: 'view',  tone: 'a' },
    ],
    link: { enabled: true,  url: 'naos://link/9bc4...4f10', role: 'view', expires: 'May 30, 2024' },
    activity: [
      { who: 'Jane Park', what: 'downloaded a copy', time: '1d ago', live: false },
      { who: 'You',       what: 'uploaded this file', time: '4d ago', live: false },
    ],
    fingerprint: 'f9e3 · 0a55 · 7b11 · cd80',
  },
  {
    id: 'budget',
    name: 'Budget.xlsx',
    kind: 'xls',
    sizeLabel: '1.1 MB',
    access: { type: 'private', count: 1, label: 'Only you' },
    encryption: 'E2EE',
    modified: 'May 6, 2024',
    modifiedFull: 'May 6, 2024 · 22:10',
    created: 'Apr 30, 2024',
    owner: 'You',
    people: [
      { name: 'You', email: 'you@naos.io', role: 'owner', tone: 'p' },
    ],
    link: { enabled: false, url: '', role: 'view', expires: '—' },
    activity: [
      { who: 'You', what: 'updated Q2 totals', time: 'May 6', live: false },
    ],
    fingerprint: '6c08 · 4321 · ef2a · 91b7',
  },
  {
    id: 'notes',
    name: 'Notes.txt',
    kind: 'txt',
    sizeLabel: '320 B',
    access: { type: 'private', count: 1, label: 'Only you' },
    encryption: 'E2EE',
    modified: 'May 5, 2024',
    modifiedFull: 'May 5, 2024',
    created: 'Apr 14, 2024',
    owner: 'You',
    people: [
      { name: 'You', email: 'you@naos.io', role: 'owner', tone: 'p' },
    ],
    link: { enabled: false, url: '', role: 'view', expires: '—' },
    activity: [
      { who: 'You', what: 'created this note', time: 'May 5', live: false },
    ],
    fingerprint: '11ab · 8800 · 5d6e · 2f93',
  },
]
