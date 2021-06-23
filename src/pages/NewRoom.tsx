import { Link, useHistory } from 'react-router-dom'
import { FormEvent, useState } from 'react'

import { useAuth } from '../hooks/useAuth'
import { database } from '../services/firebase'
import { Button } from '../components/Button'

import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'

import '../styles/auth.scss'

export function NewRoom() {
  const { user } = useAuth()
  const history = useHistory()
  const [newRoom, setNewRoom] = useState('')

  async function handleCreateNewRoom(event: FormEvent) {
    event.preventDefault()

    if (newRoom.trim() === '') return

    const roomRef = database.ref('rooms')

    const firebaseRoomCreated = await roomRef.push({
      title: newRoom,
      authorId: user?.id,
    })

    history.push(`/rooms/${firebaseRoomCreated.key}`)
  }

  return (
    <div id="page-auth">
      <aside>
        <img
          src={illustrationImg}
          alt="Illustration symbolizing questions and answers"
        />
        <strong>Create live Q&amp;A rooms</strong>
        <p>Ask your audience questions in real time</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoImg} alt="Letmeask Logo" />
          <h2>Create a new room</h2>
          <form onSubmit={handleCreateNewRoom}>
            <input
              type="text"
              placeholder="Room name"
              value={newRoom}
              onChange={event => setNewRoom(event.target.value)}
            />
            <Button type="submit">Create room</Button>
          </form>
          <p>
            Want to join an existing room? <Link to="/">Click here</Link>
          </p>
        </div>
      </main>
    </div>
  )
}
