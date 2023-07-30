import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { readDeck } from "../../utils/api";
import Card from "./Card";

function Study() {
    const params = useParams();
    const deckId = params.deckId;

    const [deck, setDeck] = useState({});
    useEffect(() => {
        const abortController = new AbortController();

        async function loadDeck() {
            try {
                const response = await readDeck(deckId);
                setDeck(response);
            } catch (error) {
                console.log(error);
            }
        }

        loadDeck();
        return () => abortController.abort();
    }, [deckId])

    if (!deck.name) return null
    let deckLength = 0;
    if (deck.cards && deck.cards.length) deckLength = deck.cards.length;

    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item"><Link to={`/decks/${deck.id}`}>{deck.name}</Link></li>
                    <li className="breadcrumb-item active">Study</li>
                </ol>
            </nav>
            <h3 className="my-3">Study: {deck.name}</h3>
            <Card deck={deck} deckLength={deckLength}/>
        </div>
    )
}

export default Study;