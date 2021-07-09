import { useParams } from "react-router-dom"
import styled, { css } from "styled-components/macro"
import { ReactComponent as AnswerSvg } from "../assets/images/answer.svg"
import { ReactComponent as CheckSvg } from "../assets/images/check.svg"
import { ReactComponent as DeleteSvg } from "../assets/images/delete.svg"
import { Header } from "../components/Header"
import { Question } from "../components/Question"
import { useRoom } from "../hooks/useRoom"
import { database } from "../services/firebase"

type RouteParams = {
  id: string
}

interface AdminRoomProps {}

export const AdminRoom = ({ ...props }: AdminRoomProps) => {
  const { id: roomId } = useParams<RouteParams>()
  const { questions, title } = useRoom(roomId)

  const handleDeleteQuestion = async (questionId: string) => {
    if (window.confirm("Tem certeza que você deseja excluir esta pergunta?")) {
      await database.ref(`rooms/${roomId}/questions/${questionId}`).remove()
    }
  }

  const handleCheckQuestionAsAnswered = async (questionId: string) => {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isAnswered: true,
    })
  }

  const handleHighlightQuestion = async (questionId: string) => {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isHighlighted: true,
    })
  }

  return (
    <StyledAdminRoom {...props}>
      <Header roomCode={roomId} style={{ gridArea: "header" }} />

      <TitleContainer>
        <RoomName>Sala {title}</RoomName>
        {questions.length > 0 && <Pill>{questions.length} pergunta(s)</Pill>}
      </TitleContainer>

      <QuestionsContainer>
        {questions.map((question) => (
          <Question key={question.id} data={question}>
            {!question.isAnswered && (
              <>
                <IconButton
                  active={question.isAnswered}
                  onClick={() => handleCheckQuestionAsAnswered(question.id)}
                >
                  <CheckSvg />
                </IconButton>
                <IconButton
                  active={question.isHighlighted}
                  onClick={() => handleHighlightQuestion(question.id)}
                >
                  <AnswerSvg />
                </IconButton>
              </>
            )}
            <IconButton onClick={() => handleDeleteQuestion(question.id)}>
              <DeleteSvg />
            </IconButton>
          </Question>
        ))}
      </QuestionsContainer>
    </StyledAdminRoom>
  )
}

const StyledAdminRoom = styled.div`
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
