import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogContent from './BlogContent'

test('like button clicked twice', () => {
  const blog = {
    title: 'Test',
    author: 'Jest',
    url: '.com',
    likes: 0,
    user: {
      username: 'test'
    }
  }

  const mockHandler = jest.fn()

  const component = render(
    <BlogContent blog={blog} updateLike={mockHandler}/>
  )

  const likeButton = component.getByText('like')
  fireEvent.click(likeButton)
  fireEvent.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)
})

// window.confirm = jest.fn(() => true)

// test('remove button clicked', () => {
//   const blog = {
//     title: 'Test',
//     author: 'Jest',
//     url: '.com',
//     likes: 0,
//     user: {
//       username: 'test'
//     }
//   }

//   const user = {
//     username: 'test'
//   }

//   const mockHandler = jest.fn()

//   const component = render(
//     <BlogContent blog={blog} user={user} updateLike={mockHandler}/>
//   )

//   const removeButton = component.getByText('remove')
//   fireEvent.click(removeButton)
//   console.log(mockHandler.mock.calls)

//   expect(mockHandler.mock.calls).toHaveLength(1)
// })
