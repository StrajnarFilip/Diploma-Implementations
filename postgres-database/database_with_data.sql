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

COPY public.comment (idcomment, content, post_idpost, user_iduser) FROM stdin;
113	Some comment	540	1
114	Some comment too	540	1
115	Comment nice	541	1
\.


--
-- Data for Name: post; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.post (idpost, title) FROM stdin;
540	Blog
541	Blog 2
\.


--
-- Data for Name: schema_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.schema_migrations (version, inserted_at) FROM stdin;
\.


--
-- Data for Name: segment; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.segment (idsegment, post_idpost, type, text, source) FROM stdin;
100	540	p	Text1	
101	540	a	Link	Link
102	541	p	View nice	
\.


--
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."user" (iduser, email, password, cookie, role) FROM stdin;
37	newi	A665A45920422F9D417E4867EFDC4FB8A04A1F3FFF1FA07E998E86F7F7A27AE3		\N
38	newelixir	A665A45920422F9D417E4867EFDC4FB8A04A1F3FFF1FA07E998E86F7F7A27AE3		\N
8	node	A665A45920422F9D417E4867EFDC4FB8A04A1F3FFF1FA07E998E86F7F7A27AE3		\N
9	dotnet	A665A45920422F9D417E4867EFDC4FB8A04A1F3FFF1FA07E998E86F7F7A27AE3		\N
33	flask	A665A45920422F9D417E4867EFDC4FB8A04A1F3FFF1FA07E998E86F7F7A27AE3		\N
34	matic	88F25D8A48E14232FDFA52C03ABD082F76358D3E211C2977E3C3AC55D54DF13D	\N	\N
35	tsnode	A665A45920422F9D417E4867EFDC4FB8A04A1F3FFF1FA07E998E86F7F7A27AE3		\N
14	spring	A665A45920422F9D417E4867EFDC4FB8A04A1F3FFF1FA07E998E86F7F7A27AE3	96B5919CFB84CBA27DE2D0137D162ED42B3888C9710470FF46C064719480F088	\N
36	xxx	F6E0A1E2AC41945A9AA7FF8A8AAA0CEBC12A3BCC981A929AD5CF810A090E11AE		\N
1	admin	8C6976E5B5410415BDE908BD4DEE15DFB167A9C873FC4BB8A81F6F2AB448A918	11E014EE0CC4E39E4B436CC1A946496214CB0D5967ACDF98D185CCF35597285E	admin
3	bon	A665A45920422F9D417E4867EFDC4FB8A04A1F3FFF1FA07E998E86F7F7A27AE3	4EA66018BEACDB225C25118FC83006E4D587D702ECFCA767FAA37D7FD11D9CE5	\N
\.


--
-- Name: comment_idcomment_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.comment_idcomment_seq', 115, true);


--
-- Name: post_idpost_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.post_idpost_seq', 543, true);


--
-- Name: segment_idsegment_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.segment_idsegment_seq', 102, true);


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

