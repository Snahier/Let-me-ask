import styled, { css } from "styled-components"

interface DividerProps {
  vertical?: boolean
  thickness?: number
}

export const Divider = ({
  vertical = false,
  thickness = 1,
  ...props
}: DividerProps) => {
  return (
    <StyledDivider isVertical={vertical} thickness={thickness} {...props} />
  )
}

type StyledDividerProps = {
  isVertical: boolean
  thickness: number
}
const StyledDivider = styled.hr<StyledDividerProps>`
  ${({ isVertical, thickness, theme }) => css`
    border: none;
    background: ${theme.colors.grayMedium};

    ${isVertical
      ? css`
          width: ${thickness}px;
          height: 100%;
        `
      : css`
          width: 100%;
          height: ${thickness}px;
        `}
  `}
`
