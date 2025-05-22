"use client";

import styles from "./Home.module.css";
import { Card, Button } from "antd";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
    return (
        <div className={styles.container}>
            <Card hoverable className={styles.card}>
                <div className={styles.imageProfile}>
                    <Image
                        src="/images/profile.jpeg"
                        alt="example"
                        width={300}
                        height={200}
                        className={styles.image}
                    />
                </div>
                <div className={styles.description}>
                    <h2 >João Vitor Porto Sales</h2>
                    <h3>2TDS1</h3>
                    <h3>Front-End, Avaliação</h3>
                    <h3>Esta API tem o propósito de mostrar a implementação do front-end com back-end, para isso irei utilizar as tabelas Usuários e Posts.</h3>
                </div>
                <div className={styles.button}>
                    <Link href="/usuarios">
                        <Button type="dashed" className={styles.colorButton}>Ver API de Usuarios e Posts</Button>
                    </Link>
                </div>
                    <h5> Docentes: Thiago Ferreira e Marcelo Carboni </h5>
            </Card>

        </div>
    );
}
