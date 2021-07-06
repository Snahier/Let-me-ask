import styled from "styled-components"
import { Header } from "../components/Header"

interface RoomProps {}

export const Room = ({ ...props }: RoomProps) => {
  return (
    <StyledRoom {...props}>
      <Header />
    </StyledRoom>
  )
}

const StyledRoom = styled.div``
