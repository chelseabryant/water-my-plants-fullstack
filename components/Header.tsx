import Link from "next/link"
import React from "react"

export default function Header() {
  return (
    <div>
      <Link href="/">
        <h1>Water My Plants</h1>
      </Link>
      <ul>
        <li>
          <Link href="/plants/explore">Explore Plants</Link>
        </li>
        <li>
          <Link href="/plants/my-plants">My Plants</Link>
        </li>
        <li>
          <Link href="/calendar">Calendar</Link>
        </li>
        <li>
          <Link href="/login">Login</Link>
        </li>
      </ul>
    </div>
  )
}
