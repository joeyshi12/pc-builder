CREATE TABLE IF NOT EXISTS user_profile
(
    username        VARCHAR(50) PRIMARY KEY,
    display_name    VARCHAR(50),
    password        VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS pc_build
(
    id                CHAR(36) PRIMARY KEY,
    display_name      VARCHAR(50) NOT NULL,
    description       VARCHAR(255),
    username          VARCHAR(50),
    creation_date     DATETIME,
    last_updated_date DATETIME,
    FOREIGN KEY (username) REFERENCES user_profile (username) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS user_comment
(
    username          VARCHAR(50),
    build_id          CHAR(36),
    content           VARCHAR(2048),
    creation_date     DATETIME,
    last_updated_date DATETIME,
    FOREIGN KEY (username) REFERENCES user_profile (username) ON DELETE SET NULL,
    FOREIGN KEY (build_id) REFERENCES pc_build (id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS component
(
    id CHAR(36) PRIMARY KEY
);

CREATE TABLE IF NOT EXISTS is_part_of
(
    component_id CHAR(36),
    build_id     CHAR(36),
    PRIMARY KEY (component_id, build_id),
    FOREIGN KEY (component_id) REFERENCES component (id) ON DELETE CASCADE,
    FOREIGN KEY (build_id) REFERENCES pc_build (id) ON DELETE CASCADE
);

--CREATE TABLE IF NOT EXISTS sold_by
--(
--    component_id    CHAR(36),
--    retailer_name   VARCHAR(50),
--    price           INT,
--    href            VARCHAR(2000),
--    FOREIGN KEY (component_id) REFERENCES component (id) ON DELETE CASCADE
--);

CREATE TABLE IF NOT EXISTS cpu
(
    id                  CHAR(36) PRIMARY KEY,
    display_name        VARCHAR(255),
    price               INT,
    core_count          INT,
    core_clock          INT,
    boost_clock         INT,
    tdp                 INT,
    integrated_graphics VARCHAR(255),
    has_smt             BOOLEAN,
    FOREIGN KEY (id) REFERENCES component (id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS motherboard
(
    id               CHAR(36) PRIMARY KEY,
    display_name     VARCHAR(255),
    price            INT,
    cpu_socket       VARCHAR(50),
    form_factor      VARCHAR(50),
    max_memory       INT,
    num_memory_slots INT,
    colour           VARCHAR(50),
    FOREIGN KEY (id) REFERENCES component (id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS memory
(
    id                 CHAR(36) PRIMARY KEY,
    display_name       VARCHAR(255),
    price              INT,
    ddr_version        INT,
    ddr_clock          INT,
    num_modules        INT,
    module_size        INT,
    colour             VARCHAR(50),
    first_word_latency INT,
    cas_latency        INT,
    FOREIGN KEY (id) REFERENCES component (id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS storage
(
    id           CHAR(36) PRIMARY KEY,
    display_name VARCHAR(255),
    price        INT,
    capacity     INT,
    type         VARCHAR(50),
    cache_size   INT,
    form_factor  VARCHAR(50),
    interface    VARCHAR(50),
    FOREIGN KEY (id) REFERENCES component (id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS video_card
(
    id           CHAR(36) PRIMARY KEY,
    display_name VARCHAR(255),
    price        INT,
    chipset      VARCHAR(50),
    memory       INT,
    core_clock   INT,
    boost_clock  INT,
    colour       VARCHAR(50),
    card_length  INT,
    FOREIGN KEY (id) REFERENCES component (id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS power_supply
(
    id           CHAR(36) PRIMARY KEY,
    display_name VARCHAR(255),
    price        INT,
    type         VARCHAR(50),
    efficiency   VARCHAR(50),
    wattage      INT,
    modular      VARCHAR(50),
    colour       VARCHAR(50),
    FOREIGN KEY (id) REFERENCES component (id) ON DELETE CASCADE
);
