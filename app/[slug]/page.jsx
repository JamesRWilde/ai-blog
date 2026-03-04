import React from 'react'

export default function PostPage({ params }) {
  const { slug } = params
  return (
    <article>
      <h2>{slug}</h2>
      <p>Post content goes here.</p>
    </article>
  )
}
