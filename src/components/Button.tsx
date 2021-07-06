import { HTMLAttributes, ReactNode } from "react"
import styled from "styled-components"

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  text?: string | ReactNode
  children?: ReactNode
}

export const Button = ({ text, children, ...props }: ButtonProps) => {
  return <StyledButton {...props}>{text || children}</StyledButton>
}

const StyledButton = styled.button`
  display: grid;
  grid-auto-flow: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  width: 100%;
  padding: 1rem;

  &:hover {
    cursor: pointer;
  }
`
