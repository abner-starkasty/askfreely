import { FormEvent, useState } from 'react'
import { useHistory } from 'react-router-dom'

import { useAuth } from '../../hooks/useAuth'
import { database } from '../../services/firebase'
import { Button } from '../../components/Button'

import googleIconImg from '../../assets/images/google-icon.svg'
import illustrationImg from '../../assets/images/illustration.svg'
import logoImg from '../../assets/images/logo.svg'

import './styles.scss'

export function Home() {
  const { user, signInWithGoogle } = useAuth()
  const history = useHistory()
  const [roomCode, setRoomCode] = useState('')

  async function handleCreateRoom() {
    if (!user) {
      await signInWithGoogle()
    }

    history.push('/rooms/new')
  }

  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault()

    if (roomCode.trim() === '') return

    const roomRef = await database.ref(`rooms/${roomCode}`).get()

    if (!roomRef.exists()) {
      alert('Room does not exists.')
      return
    }

    if (roomRef.val().closedAt) {
      alert('Room already was closed.')
      return
    }

    history.push(`/rooms/${roomCode}`)
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
          <button onClick={handleCreateRoom} className="create-room">
            <img src={googleIconImg} alt="Google Logo" />
            Create your room with Google
          </button>
          <div className="separator">or enter an existing room</div>
          <form onSubmit={handleJoinRoom}>
            <input
              type="text"
              placeholder="Type de room Code"
              value={roomCode}
              onChange={event => setRoomCode(event.target.value)}
            />
            <Button type="submit">Enter the room</Button>
          </form>
        </div>
      </main>
    </div>
  )
}
