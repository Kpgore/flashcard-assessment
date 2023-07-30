import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { readDeck, readCard } from "../../utils/api";
import Form from "./Form";

function EditCard() {
    const params = useParams();
    const deckId = params.deckId;
    const cardId = params.cardId;

    const [deck, setDeck] = useState({});
    const [card, setCard] = useState({});

    useEffect(() => {
        const abortController = new AbortController();

        async function loadDeck() {
            try {
                const response = await readDeck(deckId);
                setDeck(response);
            } catch(error) {
                console.log(error);
            }
        }

        async function loadCard() {
            try {
                const response = await readCard(cardId);
                setCard(response);
            } catch(error) {
                console.log(error);
            }
        }

        loadDeck();
        loadCard();

        return () => abortController.abort();
    }, [deckId, cardId])

    if (!deck.name || !card.front) return null;
    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item"><Link to={`/decks/${deck.id}`}>Deck {deck.name}</Link></li>
                    <li className="breadcrumb-item active">Edit Card {cardId}</li>
                </ol>
            </nav>
            <h3>Edit Card</h3>
            <Form deck={deck} cardFront={card.front} cardBack={card.back} formType="edit" cardId={cardId} />
        </div>
    )
}

export default EditCard;