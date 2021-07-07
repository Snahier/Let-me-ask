import styled from "styled-components"
import { Header } from "../components/Header"

type RoomParams = {
  id: string
}

interface RoomProps {}

export const Room = ({ ...props }: RoomProps) => {
  const params = useParams<RoomParams>()
  return (
    <StyledRoom {...props}>
      <Header roomCode={params.id} style={{ gridArea: "header" }} />
    </StyledRoom>
  )
}

const StyledRoom = styled.div``
