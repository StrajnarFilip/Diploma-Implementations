--
-- PostgreSQL database dump
--

-- Dumped from database version 14.2
-- Dumped by pg_dump version 14.5

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: comment; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.comment (
    idcomment bigint NOT NULL,
    content text NOT NULL,
    post_idpost bigint NOT NULL,
    user_iduser bigint NOT NULL
);


ALTER TABLE public.comment OWNER TO postgres;

--
-- Name: comment_idcomment_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.comment_idcomment_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.comment_idcomment_seq OWNER TO postgres;

--
-- Name: comment_idcomment_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.comment_idcomment_seq OWNED BY public.comment.idcomment;


--
-- Name: post; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.post (
    idpost bigint NOT NULL,
    title text NOT NULL
);


ALTER TABLE public.post OWNER TO postgres;

--
-- Name: post_idpost_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.post_idpost_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.post_idpost_seq OWNER TO postgres;

--
-- Name: post_idpost_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.post_idpost_seq OWNED BY public.post.idpost;


--
-- Name: schema_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.schema_migrations (
    version bigint NOT NULL,
    inserted_at timestamp(0) without time zone
);


ALTER TABLE public.schema_migrations OWNER TO postgres;

--
-- Name: segment; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.segment (
    idsegment bigint NOT NULL,
    post_idpost bigint NOT NULL,
    type text NOT NULL,
    text text,
    source text
);


ALTER TABLE public.segment OWNER TO postgres;

--
-- Name: segment_idsegment_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.segment_idsegment_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.segment_idsegment_seq OWNER TO postgres;

--
-- Name: segment_idsegment_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.segment_idsegment_seq OWNED BY public.segment.idsegment;


--
-- Name: user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."user" (
    iduser bigint NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    cookie text,
    role text
);


ALTER TABLE public."user" OWNER TO postgres;

--
-- Name: user_iduser_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_iduser_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_iduser_seq OWNER TO postgres;

--
-- Name: user_iduser_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_iduser_seq OWNED BY public."user".iduser;


--
-- Name: comment idcomment; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comment ALTER COLUMN idcomment SET DEFAULT nextval('public.comment_idcomment_seq'::regclass);


--
-- Name: post idpost; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.post ALTER COLUMN idpost SET DEFAULT nextval('public.post_idpost_seq'::regclass);


--
-- Name: segment idsegment; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.segment ALTER COLUMN idsegment SET DEFAULT nextval('public.segment_idsegment_seq'::regclass);


--
-- Name: user iduser; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user" ALTER COLUMN iduser SET DEFAULT nextval('public.user_iduser_seq'::regclass);


--
-- Data for Name: comment; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: post; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: schema_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: segment; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."user" (iduser, email, password, cookie, role) VALUES (1, 'admin', '8C6976E5B5410415BDE908BD4DEE15DFB167A9C873FC4BB8A81F6F2AB448A918', 'BB82712538C010C8E339F35A93F05106603C936286FA7CA95207E13A1F708A68', 'admin');

--
-- Name: comment_idcomment_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.comment_idcomment_seq', 102, true);


--
-- Name: post_idpost_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.post_idpost_seq', 80, true);


--
-- Name: segment_idsegment_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.segment_idsegment_seq', 97, true);


--
-- Name: user_iduser_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_iduser_seq', 38, true);


--
-- Name: comment comment_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comment
    ADD CONSTRAINT comment_pkey PRIMARY KEY (idcomment);


--
-- Name: post post_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.post
    ADD CONSTRAINT post_pkey PRIMARY KEY (idpost);


--
-- Name: schema_migrations schema_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.schema_migrations
    ADD CONSTRAINT schema_migrations_pkey PRIMARY KEY (version);


--
-- Name: segment segment_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.segment
    ADD CONSTRAINT segment_pkey PRIMARY KEY (idsegment);


--
-- Name: user uniqueemail; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT uniqueemail UNIQUE (email);


--
-- Name: user user_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (iduser);


--
-- Name: comment commentpost; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comment
    ADD CONSTRAINT commentpost FOREIGN KEY (post_idpost) REFERENCES public.post(idpost);


--
-- Name: comment commentuser; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comment
    ADD CONSTRAINT commentuser FOREIGN KEY (user_iduser) REFERENCES public."user"(iduser);


--
-- Name: segment segmentpost; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.segment
    ADD CONSTRAINT segmentpost FOREIGN KEY (post_idpost) REFERENCES public.post(idpost);


--
-- PostgreSQL database dump complete
--

