import { darken } from "polished"
import styled, { css } from "styled-components/macro"
import illustrationSvg from "../assets/images/illustration.svg"
import logoSvg from "../assets/images/logo.svg"
import { Button } from "../components/Button"

interface NewRoomProps {}

export const NewRoom = ({ ...props }: NewRoomProps) => {
  return (
    <StyledNewRoom {...props}>
      <Aside>
        <img
          src={illustrationSvg}
          alt="Ilustração simbolizando perguntas e respostas"
        />
        <AsideTitle>Crie salas de Q&amp;A ao-vivo</AsideTitle>
        <AsideDescription>
          Tire as dúvidas da sua audiência em tempo-real
        </AsideDescription>
      </Aside>

      <Main>
        <img src={logoSvg} alt="Let me ask" />

        <Title>Crie uma nova sala</Title>

        <Form onSubmit={(event) => event.preventDefault()}>
          <PageNameInput type="text" placeholder="Nome da sala" />

          <CreateRoomButton>Criar sala</CreateRoomButton>
        </Form>

        <GoToExistentPageText>
          Quer entrar em uma sala já existente? <a href="#test">Clique aqui</a>
        </GoToExistentPageText>
      </Main>
    </StyledNewRoom>
  )
}

const StyledNewRoom = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: 47% 53%;
`

const Aside = styled.aside`
  ${({ theme }) => css`
    display: grid;
    grid-auto-rows: max-content;
    align-content: center;
    gap: 1rem;

    height: 100vh;
    padding-left: 5.25rem;

    background: ${theme.colors.purple};

    color: ${theme.colors.whiteDetails};
  `}
`

const AsideTitle = styled.strong`
  font-family: Poppins;
  font-size: 2.25rem;
`

const AsideDescription = styled.p`
  font-family: Roboto;
  font-size: 1.5rem;
`

const Main = styled.main`
  display: grid;
  grid-auto-rows: max-content;
  grid-template-columns: 23.125rem;
  align-content: center;
  justify-content: center;
  justify-items: center;
`

const Title = styled.h2`
  margin-top: 3.5rem;

  font-family: Poppins;
  font-weight: bold;
  font-size: 1.5rem;
`

const Form = styled.form`
  margin-top: 1.5rem;
  width: 100%;
`

const PageNameInput = styled.input`
  ${({ theme }) => css`
    width: 100%;
    padding: 1rem;

    border: 1px solid ${theme.colors.grayMedium};
    border-radius: 0.5rem;

    &::placeholder {
      color: ${theme.colors.grayMedium};
    }
    &:focus {
      outline: none;
      border-color: ${theme.colors.purple};
    }
  `}
`

const CreateRoomButton = styled(Button)`
  ${({ theme }) => css`
    transition: background-color 0.2s;

    margin-top: 1rem;

    border: none;
    border-radius: 0.5rem;
    background: ${theme.colors.purple};

    color: ${theme.colors.whiteDetails};

    &:hover:enabled {
      background: ${darken(0.05, theme.colors.purple)};
    }
  `}
`

const GoToExistentPageText = styled.p`
  margin-top: 1rem;

  color: #737380;
  font-family: Roboto;
  font-size: 0.875rem;

  a {
    color: #e559f9;

    &:visited {
      color: ${darken(0.1, "#e559f9")};
    }
  }
`
