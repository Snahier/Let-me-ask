import { darken } from "polished"
import { Link, useParams } from "react-router-dom"
import styled, { css } from "styled-components/macro"
import { Button } from "../components/Button"
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

      <TitleContainer>
        <RoomName>Sala React Q&amp;A</RoomName>
        <Pill>4 perguntas</Pill>
      </TitleContainer>

      <Content>
        <AskContainer>
          <TextArea placeholder="O que você quer perguntar?" />

          <LogInText>
            Para enviar uma pergunta, <Link to="/">faça seu login</Link>.
          </LogInText>

          <SendQuestionButton disabled>Enviar pergunta</SendQuestionButton>
        </AskContainer>
      </Content>
    </StyledRoom>
  )
}

const StyledRoom = styled.div`
  display: grid;
  grid-template-rows: max-content 1fr;
  grid:
    "header header   header" max-content
    ".      title    .     " max-content
    ".      content  .     " 1fr
    / 1fr 50rem 1fr;

  min-height: 100vh;
`

const TitleContainer = styled.div`
  grid-area: title;

  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: max-content;
  align-items: center;
  gap: 1rem;

  margin-top: 4rem;
`

const RoomName = styled.h1`
  font-family: Poppins;
  font-weight: bold;
  font-size: 1.5rem;
`

const Pill = styled.div`
  ${({ theme }) => css`
    padding: 0.5rem 1rem;

    border-radius: 2rem;
    background: ${theme.colors.pinkDark};

    color: ${theme.colors.whiteBackground};
  `}
`

const Content = styled.div`
  grid-area: content;

  margin-top: 1rem;
`

const AskContainer = styled.div`
  display: grid;
  grid:
    "textarea textarea  "
    "login    sendButton"
    /1fr max-content;
  gap: 1rem 0;
  align-items: center;
`

const TextArea = styled.textarea`
  grid-area: textarea;

  width: 100%;
  min-height: 8.25rem;
  padding: 1rem;
  resize: vertical;

  box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.04);
  border: none;
  border-radius: 0.5rem;
`

const SendQuestionButton = styled(Button)`
  ${({ theme }) => css`
    grid-area: sendButton;

    padding: 1rem 2rem;

    border: none;
    border-radius: 0.5rem;
    background: ${theme.colors.purple};

    color: ${theme.colors.whiteBackground};

    &:hover:enabled {
      background: ${darken(0.05, theme.colors.purple)};
    }
  `}
`

const LogInText = styled.p`
  ${({ theme }) => css`
    grid-area: login;

    color: ${theme.colors.grayDark};

    a {
      color: ${theme.colors.purple};
    }
  `}
`
