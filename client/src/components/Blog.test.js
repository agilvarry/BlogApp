import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders content', () => {
    const newBlog = {
        title: "test1",
        author: "author1",
        url: "https://pleaseupdate.com/",
        userId: "6307daff4d9aa036d12271eb",
        likes: 7
    }

    render(<Blog blog={newBlog} blogs={null} setBlogs={null} />)

    const element = screen.getByText('test1 - author1')

    expect(element).toBeDefined()
})

