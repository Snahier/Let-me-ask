import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../contexts/AuthContext"
import { database } from "../services/firebase"

type FirebaseQuestions = Record<
  string,
  {
    author: {
      name: string
      avatar: string
    }
    content: string
    isAnswered: boolean
    isHighlighted: boolean
    likes: Record<
      string,
      {
        authorId: string
      }
    >
  }
>

type IQuestion = {
  id: string
  author: {
    name: string
    avatar: string
  }
  content: string
  isAnswered: boolean
  isHighlighted: boolean
  likeCount: number
  likeId: string | undefined
}

export const useRoom = (roomId: string) => {
  const { user } = useContext(AuthContext)
  const [title, setTitle] = useState()
  const [questions, setQuestions] = useState<IQuestion[]>([])
  const [authorId, setAuthorId] = useState()

  useEffect(() => {
    const roomRef = database.ref(`rooms/${roomId}`)

    roomRef.on("value", (room) => {
      const databaseRoom = room.val()
      const firebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {}

      const parsedQuestions = Object.entries(firebaseQuestions).map(
        ([key, value]) => ({
          id: key,
          content: value.content,
          author: value.author,
          isHighlighted: value.isHighlighted,
          isAnswered: value.isAnswered,
          likeCount: Object.values(value.likes ?? {}).length,
          likeId: Object.entries(value.likes ?? {}).find(
            ([key, like]) => like.authorId === user?.id
          )?.[0],
        })
      )

      setTitle(databaseRoom.title)
      setQuestions(parsedQuestions)
      setAuthorId(databaseRoom.authorId)
    })

    return () => roomRef.off("value")
  }, [roomId, user?.id])

  return { questions, title, authorId }
}
