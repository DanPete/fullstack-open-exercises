import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

test('<BlogForm /> updates parent state and calls onSubmit', () => {
  const createBlog = jest.fn()

  const component = render(
    <BlogForm createBlog={createBlog} />
  )

  const titleInput = component.container.querySelector('input[name="title"]')
  const authorInput = component.container.querySelector('input[name="author"]')

  const form = component.container.querySelector('form')

  fireEvent.change(titleInput, {
    target: { value: 'Test title form input' }
  })

  fireEvent.change(authorInput, {
    target: { value: 'tester' }
  })

  fireEvent.submit(form)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('Test title form input')
  expect(createBlog.mock.calls[0][0].author).toBe('tester')
})


