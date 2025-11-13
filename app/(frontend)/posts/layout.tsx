import React from 'react'

export default async function PostsLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <div>
      {children}
    </div>
  )
}
