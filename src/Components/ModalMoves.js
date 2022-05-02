import React, { useState } from 'react'
import { Modal } from 'react-bootstrap';
import poke from "../Styles/Images/pokeball.png";
import styles from "../Styles/DetailsPokemon/DetailsPokemon.module.scss";

const ModalMoves = ({moves, set}) => {


    const [show, setShow] = useState(true);
    const handleClose = () => {
        setShow(false)
        set(false)
    };
    
    return (
        <div >
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>Todos los movimientos</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className={styles.modal_content}>
                       {/*  Listar todos los movimientos del pokemon */}
                        {
                            moves.map((move, index) => {
                                return (
                                    <div key={index} className={styles.modal_body}>
                                        <img src={poke} alt="poke" />
                                        <p>{move.move.name}</p>
                                    </div>
                                )
                            })
                        }
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default ModalMoves;