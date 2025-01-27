import React from 'react';
import { it, expect, describe, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from '../../src/components/Button';
import '@testing-library/jest-dom';

describe('Button', () => {
  it('renders correctly with the given text', () => {
    render(<Button text="Click me" />);

    const buttonElement = screen.getByText('Click me');
    expect(buttonElement).toBeInTheDocument(); // Ensure the button text appears
  });

  it('triggers onClick handler when clicked', () => {
    const onClick = vi.fn(); // Mock the onClick function
    render(<Button text="Click me" onClick={onClick} />);

    const buttonElement = screen.getByText('Click me');
    fireEvent.click(buttonElement); // Simulate a click event

    expect(onClick).toHaveBeenCalled(); // Ensure the onClick function was called
  });

  it('does not throw error when onClick is not provided', () => {
    render(<Button text="Click me" />);

    const buttonElement = screen.getByText('Click me');
    fireEvent.click(buttonElement); // Simulate a click event

    // Just ensure no error occurs when clicking a button without an onClick handler
    expect(true).toBe(true);
  });
});
