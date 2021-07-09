import { darken } from "polished"
import { FormEvent, useContext, useState } from "react"
import { Link, useParams } from "react-router-dom"
import styled, { css } from "styled-components/macro"
import { ReactComponent as LikeSvg } from "../assets/images/like.svg"
import { Button } from "../components/Button"
import { Header } from "../components/Header"
import { Question } from "../components/Question"
import { AuthContext } from "../contexts/AuthContext"
import { useRoom } from "../hooks/useRoom"
import { database } from "../services/firebase"

type RouteParams = {
  id: string
}

interface RoomProps {}

export const Room = ({ ...props }: RoomProps) => {
  const { user } = useContext(AuthContext)
  const { id: roomId } = useParams<RouteParams>()
  const { questions, title, authorId } = useRoom(roomId)

  const [newQuestion, setNewQuestion] = useState("")

  const handleSendQuestion = async (event: FormEvent) => {
    event.preventDefault()

    if (newQuestion.trim() === "") return

    if (!user) throw new Error("User not authenticated")

    const question = {
      content: newQuestion,
      author: {
        name: user.name,
        avatar: user.avatar,
      },
      isHighlighted: false,
      isAnswered: false,
    }

    await database.ref(`/rooms/${roomId}/questions`).push(question)

    setNewQuestion("")
  }

  const handleLikeQuestion = async (
    questionId: string,
    likeId: string | undefined
  ) => {
    if (likeId) {
      await database
        .ref(`rooms/${roomId}/questions/${questionId}/likes/${likeId}`)
        .remove()
    } else {
      await database.ref(`rooms/${roomId}/questions/${questionId}/likes`).push({
        authorId: user?.id,
      })
    }
  }

  return (
    <StyledRoom {...props}>
      <Header roomCode={roomId} style={{ gridArea: "header" }} />

      <TitleContainer>
        <RoomName>Sala {title}</RoomName>
        {questions.length > 0 && <Pill>{questions.length} pergunta(s)</Pill>}
      </TitleContainer>

      {user?.id !== authorId && (
        <AskContainer>
          <TextArea
            placeholder="O que você quer perguntar?"
            value={newQuestion}
            onChange={(event) => setNewQuestion(event.target.value)}
          />

          {user ? (
            <UserContainer>
              <UserAvatar
                src={user.avatar as string}
                alt={user.name as string}
              />
              <UserName>{user.name}</UserName>
            </UserContainer>
          ) : (
            <LogInText>
              Para enviar uma pergunta, <Link to="/">faça seu login</Link>.
            </LogInText>
          )}

          <SendQuestionButton disabled={!user} onClick={handleSendQuestion}>
            Enviar pergunta
          </SendQuestionButton>
        </AskContainer>
      )}

      <QuestionsContainer>
        {questions.map((question) => (
          <Question key={question.id} data={question}>
            {!question.isAnswered && (
              <LikeIconButton
                active={Boolean(question?.likeId)}
                onClick={() =>
                  handleLikeQuestion(question.id, question?.likeId)
                }
              >
                {question.likeCount || null} <LikeSvg />
              </LikeIconButton>
            )}
          </Question>
        ))}
      </QuestionsContainer>
    </StyledRoom>
  )
}

const StyledRoom = styled.div`
  display: grid;
  grid-template-rows: max-content 1fr;
  grid:
    "header header    header"
    ".      title     .     "
    ".      form      .     "
    ".      questions .     " 1fr
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

const AskContainer = styled.form`
  grid-area: form;

  display: grid;
  grid:
    "textarea textarea  "
    "userArea sendButton"
    /1fr max-content;
  gap: 1rem 0;
  align-items: center;

  margin-top: 1rem;
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
    grid-area: userArea;

    color: ${theme.colors.grayDark};

    a {
      color: ${theme.colors.purple};
    }
  `}
`

const UserContainer = styled.div`
  grid-area: userArea;

  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: max-content;
  align-items: center;
  gap: 0 1rem;
`

const UserAvatar = styled.img`
  width: 2rem;
  height: 2rem;

  border-radius: 50%;
`

const UserName = styled.span`
  font-family: Roboto;
  font-size: 0.875rem;
  font-weight: 500;
`

const QuestionsContainer = styled.div`
  grid-area: questions;
  display: grid;
  gap: 0.5rem;
  grid-auto-rows: max-content;

  margin-top: 2rem;
`

type IconButtonProps = {
  active?: boolean
}
const IconButton = styled.button<IconButtonProps>`
  ${({ theme, active }) => css`
    transition: filter 0.2s;
    border: none;
    background: transparent;

    font-size: 0;

    color: ${active ? theme.colors.purple : theme.colors.grayDark};

    &:hover {
      filter: brightness(0.7);
    }
  `}
`

const LikeIconButton = styled(IconButton)`
  display: grid;
  grid-auto-flow: column;
  align-items: end;
  gap: 0.5rem;

  font-size: 1rem;
`
