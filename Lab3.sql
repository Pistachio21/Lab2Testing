PGDMP         %                |            Lab2 (Testing)    15.4    15.4                0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                       1262    17126    Lab2 (Testing)    DATABASE     �   CREATE DATABASE "Lab2 (Testing)" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_Philippines.1252';
     DROP DATABASE "Lab2 (Testing)";
                postgres    false            �            1259    33515    carts    TABLE     v   CREATE TABLE public.carts (
    id integer NOT NULL,
    user_id integer,
    pog_id integer,
    quantity integer
);
    DROP TABLE public.carts;
       public         heap    postgres    false            �            1259    33514    carts_id_seq    SEQUENCE     �   CREATE SEQUENCE public.carts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.carts_id_seq;
       public          postgres    false    219                       0    0    carts_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.carts_id_seq OWNED BY public.carts.id;
          public          postgres    false    218            �            1259    17128    pogs    TABLE     �   CREATE TABLE public.pogs (
    id integer NOT NULL,
    name character varying(255),
    ticker_symbol character varying(255),
    price integer,
    color character varying(255),
    previous_price numeric,
    user_id integer
);
    DROP TABLE public.pogs;
       public         heap    postgres    false            �            1259    17127    pogs_id_seq    SEQUENCE     �   CREATE SEQUENCE public.pogs_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 "   DROP SEQUENCE public.pogs_id_seq;
       public          postgres    false    215                       0    0    pogs_id_seq    SEQUENCE OWNED BY     ;   ALTER SEQUENCE public.pogs_id_seq OWNED BY public.pogs.id;
          public          postgres    false    214            �            1259    25324    users    TABLE       CREATE TABLE public.users (
    id integer NOT NULL,
    firstname character varying(255),
    lastname character varying(255),
    email character varying(255),
    password character varying(255),
    wallet numeric,
    classification character varying(255),
    pogs_id numeric
);
    DROP TABLE public.users;
       public         heap    postgres    false            �            1259    25323    users_id_seq    SEQUENCE     �   CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.users_id_seq;
       public          postgres    false    217                       0    0    users_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
          public          postgres    false    216            q           2604    33518    carts id    DEFAULT     d   ALTER TABLE ONLY public.carts ALTER COLUMN id SET DEFAULT nextval('public.carts_id_seq'::regclass);
 7   ALTER TABLE public.carts ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    219    218    219            o           2604    17131    pogs id    DEFAULT     b   ALTER TABLE ONLY public.pogs ALTER COLUMN id SET DEFAULT nextval('public.pogs_id_seq'::regclass);
 6   ALTER TABLE public.pogs ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    214    215    215            p           2604    25327    users id    DEFAULT     d   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    217    216    217                      0    33515    carts 
   TABLE DATA                 public          postgres    false    219   �                 0    17128    pogs 
   TABLE DATA                 public          postgres    false    215   6       	          0    25324    users 
   TABLE DATA                 public          postgres    false    217   �                  0    0    carts_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.carts_id_seq', 81, true);
          public          postgres    false    218                       0    0    pogs_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.pogs_id_seq', 136, true);
          public          postgres    false    214                       0    0    users_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.users_id_seq', 10, true);
          public          postgres    false    216            w           2606    33520    carts carts_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.carts
    ADD CONSTRAINT carts_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.carts DROP CONSTRAINT carts_pkey;
       public            postgres    false    219            s           2606    17135    pogs pogs_pkey 
   CONSTRAINT     L   ALTER TABLE ONLY public.pogs
    ADD CONSTRAINT pogs_pkey PRIMARY KEY (id);
 8   ALTER TABLE ONLY public.pogs DROP CONSTRAINT pogs_pkey;
       public            postgres    false    215            u           2606    25331    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    217               {   x���v
Q���W((M��L�KN,*)V��L�Q(-N-�1
���taib^IfI��B��O�k�����������������5�'�ZB�0�j���0����FP��DSC���N��� d�xt         T  x���Qk�0���y�B���tA�1���֠�ؖt��wo�,O��P8''ebKeN��3��{����9vd�!�ˋ
ɏ�����eߘ��VWpZ5����_����~�w�>��W��%�q4	I�ѧ���Uc��nu}v�,$��|�>`�σ��I����H�s�`Φ�%��K<��J]#M�F2�H���[�>ybpޮ�o� �c�w(���l&��,$�*����;��'��]g$͘#�FG�(���sV֔��I%�e�ԝ�O|B,��7᪃M>����٠�&IWL8�Mz+3���e}T���{8M�`b�H\�9�mo[�揘�?��b      	   J  x�͓Io�@���"%��	��R��`��/� cf���|�0R��HU+59���y������ʶ�h+g��� �%*J斄�D��Ja�L�,�@��e�}U�U&�kJr"�H��YT� �����en�s�ŰMoz��FI#I�
_�9�{DG� Kh����9��/�=v�`�U�on�5�\���3��F��fY�*�n���}�Ĳl�꽕kw߮�������b��
d¨&q�fԫ^3�B���P�Z��T	���Uĩ�B��S�8?�{N�t>)�= �/h&$�$j�����v���Y�.�Z�J�,@���6�E,Ɛ�Z�q�1Y ���/���X�>�V��
wV-0��������vfy���$͔x,{�D����?Zv�3�.�N���#��W��y���a.�c���Q�Xϲf�y͘��~�-���g��c_1�H��1��w�|b������\��ܳ��j'
N/n�X�LO3]<����z����~,s�z)�nG��5B��j\�p���=
V�'�/�y;����U|��;��.�����o�WW/:�*�     