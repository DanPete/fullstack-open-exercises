import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

test('should render content', () => {
  const blog = {
    title: 'Test',
    author: 'Jest',
    url: '.com',
    likes: 0,
  }

  const component = render(
    <Blog blog={blog} />
  )

  expect(component.container).toHaveTextContent (
    'Test'
  )
})

test('initially blog content is hidden', () => {
  const blog = {
    title: 'Test',
    author: 'Jest',
    url: '.com',
    likes: 0,
    user: {
      username: 'test'
    }
  }

  const component = render(
    <Blog blog={blog} />
  )

  expect(component.container.querySelector('.blogContent')).toBeFalsy()
})

test('clicking the button renders blog content', () => {
  const blog = {
    title: 'Test',
    author: 'Jest',
    url: '.com',
    likes: 0,
    user: {
      username: 'test'
    }
  }

  const component = render(
    <Blog blog={blog} />
  )

  const viewButton = component.getByText('view')
  fireEvent.click(viewButton)

  expect(component.container.querySelector('.blogContent')).toBeTruthy()
})
