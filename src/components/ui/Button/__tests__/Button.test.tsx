import { expect, test, vi } from 'vitest'
import { userEvent } from '@testing-library/user-event'
import { render, screen } from '@testing-library/react'
import {Button} from '../Button'
import { describe } from 'node:test';

describe('Button component', () => {
  test("renders a button with default variant and size", () => {
  render(<Button>Click Me</Button>);

  const button = screen.getByText("Click Me");
  screen.debug()
  expect(button).toBeInTheDocument();
  expect(button).toHaveClass("bg-primary text-primary-foreground");
  expect(button).toHaveClass("h-10 py-2 px-4");

  });

  test("applies the correct variant class", () => {
    render(<Button variant="destructive">Delete</Button>);

    const button = screen.getByRole("button", { name: /delete/i });
    expect(button).toHaveClass("bg-destructive text-destructive-foreground hover:bg-destructive/90");
  });

  test("applies the correct size class", () => {
    render(<Button size="sm">Small Button</Button>);

    const button = screen.getByRole("button", { name: /small button/i });
    expect(button).toHaveClass("h-9 px-3 rounded-md");
  });

  test("handles both variant and size together", () => {
    render(<Button variant="outline" size="lg">Large Outline</Button>);

    const button = screen.getByRole("button", { name: /large outline/i });
    expect(button).toHaveClass("border border-input hover:bg-accent hover:text-accent-foreground");
    expect(button).toHaveClass("h-11 px-8 rounded-md");
  });

  test("renders a custom className", () => {
    render(<Button className="custom-class">Custom</Button>);

    const button = screen.getByRole("button", { name: /custom/i });
    expect(button).toHaveClass("custom-class");
  });

  test("forwards additional props", async () => {
    const user = userEvent.setup()
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Click Me</Button>);

    const button = screen.getByRole("button", { name: /click me/i });
    await user.click(button);

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  test("renders as a child component when asChild is true", () => {
    render(
      <Button asChild>
        <a href="/test">Link Button</a>
      </Button>
    );

    const link = screen.getByRole("link", { name: /link button/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/test");
  });

  test("disables the button when `disabled` is set", () => {
    render(<Button disabled>Disabled Button</Button>);

    const button = screen.getByRole("button", { name: /disabled button/i });
    expect(button).toBeDisabled();
    expect(button).toHaveClass("disabled:opacity-50 disabled:pointer-events-none");
  });

  test("handles both variant and size together", () => {
    render(<Button variant="outline" size="lg">Large Outline</Button>);

    const button = screen.getByRole("button", { name: /large outline/i });
    expect(button).toHaveClass("border border-input hover:bg-accent hover:text-accent-foreground");
    expect(button).toHaveClass("h-11 px-8 rounded-md");
  });

  test("renders a custom className", () => {
    render(<Button className="custom-class">Custom</Button>);

    const button = screen.getByRole("button", { name: /custom/i });
    expect(button).toHaveClass("custom-class");
  });

  test("forwards additional props",async () => {
    const user = userEvent.setup()
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Click Me</Button>);

    const button = screen.getByRole("button", { name: /click me/i });
    await user.click(button);

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  test("renders as a child component when asChild is true", () => {
    render(
      <Button asChild>
        <a href="/test">Link Button</a>
      </Button>
    );

    const link = screen.getByRole("link", { name: /link button/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/test");
  });

  test("disables the button when `disabled` is set", () => {
    render(<Button disabled>Disabled Button</Button>);

    const button = screen.getByRole("button", { name: /disabled button/i });
    expect(button).toBeDisabled();
    expect(button).toHaveClass("disabled:opacity-50 disabled:pointer-events-none");
  });

  test("renders a custom className", () => {
    render(<Button className="custom-class">Custom</Button>);

    const button = screen.getByRole("button", { name: /custom/i });
    expect(button).toHaveClass("custom-class");
  });

  test("handles both variant and size together", () => {
    render(<Button variant="outline" size="lg">Large Outline</Button>);

    const button = screen.getByRole("button", { name: /large outline/i });
    expect(button).toHaveClass("border border-input hover:bg-accent hover:text-accent-foreground");
    expect(button).toHaveClass("h-11 px-8 rounded-md");
  });

  test("renders a custom className", () => {
    render(<Button className="custom-class">Custom</Button>);

    const button = screen.getByRole("button", { name: /custom/i });
    expect(button).toHaveClass("custom-class");
  });

  test("forwards additional props", async () => {
    const user = userEvent.setup()
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Click Me</Button>);

    const button = screen.getByRole("button", { name: /click me/i });
    await user.click(button);

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  test("renders as a child component when asChild is true", () => {
    render(
      <Button asChild>
        <a href="/test">Link Button</a>
      </Button>
    );

    const link = screen.getByRole("link", { name: /link button/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/test");
  });

  test("disables the button when `disabled` is set", () => {
    render(<Button disabled>Disabled Button</Button>);

    const button = screen.getByRole("button", { name: /disabled button/i });
    expect(button).toBeDisabled();
    expect(button).toHaveClass("disabled:opacity-50 disabled:pointer-events-none");
  });

  test("forwards additional props", async () => {
    const user = userEvent.setup()
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Click Me</Button>);

    const button = screen.getByRole("button", { name: /click me/i });
    await user.click(button);

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  test("renders as a child component when asChild is true", () => {
    render(
      <Button asChild>
        <a href="/test">Link Button</a>
      </Button>
    );

    const link = screen.getByRole("link", { name: /link button/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/test");
  });

  test("disables the button when `disabled` is set", () => {
    render(<Button disabled>Disabled Button</Button>);

    const button = screen.getByRole("button", { name: /disabled button/i });
    expect(button).toBeDisabled();
    expect(button).toHaveClass("disabled:opacity-50 disabled:pointer-events-none");
  });

})