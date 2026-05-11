'use client'
import { useEffect } from 'react'
import { loadThemeFromStorage } from '../admin/AdminTheme'

export default function ThemeLoader() {
  useEffect(() => {
    loadThemeFromStorage()
  }, [])
  return null
}
