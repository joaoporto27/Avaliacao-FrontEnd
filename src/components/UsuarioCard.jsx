import styles from "../styles/UsuarioCard.module.css";
import Image from "next/image";

export default function UsuarioCard({ usuario, openModal }) {
    return (
        <div className={styles.card} onClick={() => openModal(usuario)}>
            <Image
                src={usuario.photo ? usuario.photo : "/images/220x220.svg"}
                alt={`Imagem de ${usuario.name}`}
                width={100}
                height={100}
                
            />
            <div className={styles.info}>
                <h3>{usuario.name}</h3>
                <p>{usuario.email}</p>
            </div>
        </div>
    )
}