"use client"
import React, { useEffect, useRef, useState } from "react"

type Props = {
  text: string
  duration?: number
  interval?: number
  delay?: number
  className?: string
  style?: React.CSSProperties
  charset?: string
  preserveWhitespace?: boolean
  monospace?: boolean
}

function rnd(chars: string) {
  return chars[Math.floor(Math.random() * chars.length)] || "_"
}

function makeScramble(src: string, charset: string, preserveWhitespace: boolean) {
  return src
    .split("")
    .map(ch => (preserveWhitespace && /\s/.test(ch) ? ch : rnd(charset)))
    .join("")
}

export default function RevealText({
  text,
  duration = 2000,
  interval = 50,
  delay = 0,
  className = "",
  style = {},
  charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
  preserveWhitespace = true,
  monospace = true,
}: Props) {
  const [displayed, setDisplayed] = useState("")
  const startRef = useRef<number | null>(null)
  const timerRef = useRef<number | null>(null)
  const delayRef = useRef<number | null>(null)

  useEffect(() => {
    // estado inicial: scramble inmediato para respetar layout durante el delay
    setDisplayed(makeScramble(text, charset, preserveWhitespace))
    startRef.current = null

    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
    if (delayRef.current) {
      clearTimeout(delayRef.current)
      delayRef.current = null
    }

    const start = () => {
      startRef.current = Date.now()
      timerRef.current = window.setInterval(() => {
        if (startRef.current == null) return
        const elapsed = Date.now() - startRef.current
        const p = Math.min(elapsed / duration, 1)
        const revealCount = Math.floor(p * text.length)

        const next = text
          .split("")
          .map((ch, i) => {
            if (i < revealCount) return ch
            if (preserveWhitespace && /\s/.test(ch)) return ch
            return rnd(charset)
          })
          .join("")

        setDisplayed(next)

        if (p === 1) {
          if (timerRef.current) clearInterval(timerRef.current)
          timerRef.current = null
        }
      }, interval)
    }

    delayRef.current = window.setTimeout(start, Math.max(0, delay))

    return () => {
      if (delayRef.current) clearTimeout(delayRef.current)
      if (timerRef.current) clearInterval(timerRef.current)
      delayRef.current = null
      timerRef.current = null
    }
  }, [text, duration, interval, delay, charset, preserveWhitespace])

  return (
    <span
      className={className}
      style={{
        whiteSpace: "pre-wrap",
        ...style,
      }}
    >
      {displayed}
    </span>
  )
}
