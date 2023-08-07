import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { createCard, deleteCard } from "../../utils/api";

function Form({ deck, cardFront, cardBack, formType, cardId }) {
    const initialCardData = {
        front: "",
        back: "",
    };
    const [cardData, setCardData] = useState({ ...initialCardData });

    useEffect(() => {
        setCardData({
            front: cardFront,
            back: cardBack,
            deckId: deck.id,
        });
    }, [cardBack, cardFront, deck.id]);

    const handleChange = ({ target }) => {
        setCardData({
            ...cardData,
            [target.name]: target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (formType === "add") {
            await createCard(deck.id, cardData);
        } else if (formType === "edit") {
            if (cardId) {
                await deleteCard(cardId);
                await createCard(deck.id, cardData);
            }
        }

        // Clear the form for another submission
        setCardData({ ...initialCardData });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="front">Front</label>
                <textarea
                    className="form-control"
                    id="front"
                    name="front"
                    required
                    value={cardData.front}
                    onChange={handleChange}
                    placeholder="Front side of card"
                />
            </div>
            <div className="form-group">
                <label htmlFor="back">Back</label>
                <textarea
                    className="form-control"
                    id="back"
                    name="back"
                    required
                    value={cardData.back}
                    onChange={handleChange}
                    placeholder="Back side of card"
                />
            </div>
            <div className="d-flex flex-row">
                <Link to={`/decks/${deck.id}`} className="btn btn-secondary mr-2">
                    Done
                </Link>
                <button type="submit" className="btn btn-primary">
                    Save
                </button>
            </div>
        </form>
    );
}

export default Form;