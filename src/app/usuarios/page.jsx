"use client";

import styles from "./Usuarios.module.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { Pagination, Modal, Skeleton } from "antd";
import { ToastContainer, toast } from "react-toastify";
import Image from "next/image";
import UsuarioCard from "../../components/UsuarioCard";

const HEADERS = { "x-api-key": process.env.NEXT_PUBLIC_API_KEY };

export default function Usuarios() {
    const [data, setData] = useState({
        usuarios: [],
        loading: true,
        current: 1,
        pageSize: 0,
    });

    const [modalInfo, setModalInfo] = useState({
        visible: false,
        usuario: null,
        email: null,
        loading: false,
    });

    useEffect(() => {
        const fetchUsuarios = async () => {
            try {
                const { data: usuarios } = await axios.get(
                    `${process.env.NEXT_PUBLIC_API_URL}/users`,
                    {
                        headers: HEADERS,
                    }
                );
                setData({ usuarios, loading: false, current: 1, pageSize: 8 });
            } catch {
                toast.error("Erro ao carregar os usuários");
                setData((d) => ({ ...d, loading: false }));
            }
        };

        fetchUsuarios();
    }, []);

    const openModal = async (usuario) => {
        setModalInfo({ visible: true, usuario, posts: null, loading: true });

        try {
            const { data: posts } = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}/posts/${usuario.id}`,
                {
                    headers: HEADERS,
                }
            );
            setModalInfo((m) => ({ ...m, posts, loading: false }));
        } catch {
            toast.error("Erro ao carregar as informações do usuário");
            setModalInfo((m) => ({ ...m, loading: false }));
        }
    };

    const paginatedUsuarios = () => {
        const start = (data.current - 1) * data.pageSize;
        return data.usuarios.slice(start, start + data.pageSize);
    };

    return (
        <div>
            <h1>Lista de usuários</h1>

            <Pagination
                current={data.current}
                pageSize={data.pageSize}
                total={data.usuarios.length}
                onChange={(page) => setData((d) => ({ ...d, current: page }))}
                showSizeChanger
                pageSizeOptions={["5", "10", "20"]}
            />

            {data.loading ? (
                <Image
                    src="/images/loading.gif"
                    alt="Loading"
                    width={200}
                    height={200}
                />
            ) : (
                <div className={styles.cardContainer}>
                    {paginatedUsuarios().map((usuario) => (
                        <UsuarioCard
                            key={usuario.id}
                            usuario={usuario}
                            openModal={openModal}
                        />
                    ))}
                </div>
            )}

           <Modal
    title={`Posts de ${modalInfo.usuario?.name || ""}`}
    open={modalInfo.visible}
    onCancel={() =>
        setModalInfo({
            visible: false,
            usuario: null,
            posts: null,
            loading: false,
        })
    }
    onOk={() =>
        setModalInfo({
            visible: false,
            usuario: null,
            posts: null,
            loading: false,
        })
    }
    width={800}
>
    {modalInfo.loading ? (
        <Skeleton active />
    ) : Array.isArray(modalInfo.posts) && modalInfo.posts.length > 0 ? (
        <div className={styles.postsInfo}>
            {modalInfo.posts.map((post) => (
                <div key={post.id} className={styles.postItem}>
                    <p>
                        <span className={styles.label}>Título:</span> {post.title}
                    </p>
                    <p>
                        <span className={styles.label}>Imagem:</span>
                        <Image
                            src={post.image}
                            alt="Imagem do post"
                            width={200}
                            height={200}
                        />
                    </p>
                </div>
            ))}
        </div>
    ) : (
        <p>Não há posts para este usuário</p>
    )}
</Modal>
            <ToastContainer position="top-right" autoClose={3000} />
        </div>
    );
}
