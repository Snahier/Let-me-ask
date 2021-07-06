import { darken } from "polished"
import { useContext } from "react"
import { useHistory } from "react-router-dom"
import styled, { css } from "styled-components/macro"
import googleIconSvg from "../assets/images/google-icon.svg"
import illustrationSvg from "../assets/images/illustration.svg"
import logoSvg from "../assets/images/logo.svg"
import { Button } from "../components/Button"
import { Divider } from "../components/Divider"
import { AuthContext } from "../contexts/AuthContext"

interface HomeProps {}

export const Home = ({ ...props }: HomeProps) => {
  const history = useHistory()
  const { user, signInWithGoogle } = useContext(AuthContext)

  const handleCreateRoom = async () => {
    if (!user) await signInWithGoogle()

    history.push("/rooms/new")
  }

  return (
    <StyledHome {...props}>
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

        <GoogleButton onClick={handleCreateRoom}>
          <img src={googleIconSvg} alt="Logo da Google" />
          Crie sua sala com o Google
        </GoogleButton>

        <DividerWrapper>
          <Divider />
          <span>ou entre em uma sala</span>
          <Divider />
        </DividerWrapper>

        <Form onSubmit={(event) => event.preventDefault()}>
          <PageCodeInput type="text" placeholder="Digite o código da sala" />

          <EnterRoomButton>Entrar na sala</EnterRoomButton>
        </Form>
      </Main>
    </StyledHome>
  )
}

const StyledHome = styled.div`
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

const GoogleButton = styled(Button)`
  ${({ theme }) => css`
    transition: background-color 0.2s;

    margin-top: 3.5rem;

    border: none;
    border-radius: 0.5rem;
    background: #ea4335;

    color: ${theme.colors.whiteDetails};

    &:hover:enabled {
      background: ${darken(0.05, "#ea4335")};
    }
  `}
`

const DividerWrapper = styled.div`
  ${({ theme }) => css`
    display: grid;
    grid-auto-flow: column;
    grid-template-columns: 1fr max-content 1fr;
    align-items: center;
    justify-items: center;
    gap: 1rem;

    margin: 2rem 0;
    width: 100%;

    color: ${theme.colors.grayMedium};
  `}
`

const Form = styled.form`
  width: 100%;
`

const PageCodeInput = styled.input`
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

const EnterRoomButton = styled(Button)`
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
