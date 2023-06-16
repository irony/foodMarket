import { useContext, useEffect, useState } from 'react'
import { SocketContext } from '../context/socketContext'
import { Offer } from '../data/offers'

const useOffers = (): [Array<Offer>, any, any, any] => {
  const socket = useContext(SocketContext)
  const [offers, setOffers] = useState([] as Array<Offer>)

  useEffect(() => {
    const receive = (offers: Array<Offer>) => {
      setOffers(offers)
    }
    socket.on('offers', receive)

    return () => {
      socket.off('offers', receive)
    }
  }, [socket])

  const editOffer = (offer: Offer) => {
    socket.emit('editOffer', offer)
  }

  const addOffer = (offer: Offer) => {
    socket.emit('addOffer', offer)
  }

  const refresh = () =>
    socket.emit('offers', (offers: Array<Offer>) => setOffers(offers))

  return [offers, editOffer, addOffer, refresh]
}

export default useOffers
