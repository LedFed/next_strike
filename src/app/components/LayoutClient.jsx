'use client'
import { usePageViews } from '@koiztech/next-yandex-metrika'

export default function LayoutClient({ children }) {
    usePageViews()
    return <>{children}</>
}
