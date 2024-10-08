CREATE TABLE IF NOT EXISTS user_profile
(
    username     CHAR(255) PRIMARY KEY,
    display_name TEXT,
    email        CHAR(255) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS component
(
    id UUID PRIMARY KEY
);

CREATE TABLE IF NOT EXISTS cpu
(
    id                  UUID PRIMARY KEY,
    display_name        TEXT,
    price               INT,
    core_count          INT,
    core_clock          INT,
    boost_clock         INT,
    tdp                 INT,
    integrated_graphics CHAR(255),
    has_smt             BOOLEAN,
    FOREIGN KEY (id) REFERENCES component (id)
);

CREATE TABLE IF NOT EXISTS motherboard
(
    id               UUID PRIMARY KEY,
    display_name     TEXT,
    price            INT,
    cpu_socket       CHAR(64),
    form_factor      CHAR(64),
    max_memory       INT,
    num_memory_slots INT,
    colour           CHAR(64),
    FOREIGN KEY (id) REFERENCES component (id)
);

CREATE TABLE IF NOT EXISTS memory
(
    id                 UUID PRIMARY KEY,
    display_name       TEXT,
    price              INT,
    ddr_version        INT,
    ddr_clock          INT,
    num_modules        INT,
    module_size        INT,
    colour             CHAR(64),
    first_word_latency INT,
    cas_latency        INT,
    FOREIGN KEY (id) REFERENCES component (id)
);

CREATE TABLE IF NOT EXISTS storage
(
    id           UUID PRIMARY KEY,
    display_name TEXT,
    price        INT,
    capacity     INT,
    type         CHAR(64),
    cache_size   INT,
    form_factor  CHAR(64),
    interface    CHAR(64),
    FOREIGN KEY (id) REFERENCES component (id)
);

CREATE TABLE IF NOT EXISTS video_card
(
    id           UUID PRIMARY KEY,
    display_name TEXT,
    price        INT,
    chipset      CHAR(64),
    memory       INT,
    core_clock   INT,
    boost_clock  INT,
    colour       CHAR(64),
    card_length  INT,
    FOREIGN KEY (id) REFERENCES component (id)
);

CREATE TABLE IF NOT EXISTS power_supply
(
    id           UUID PRIMARY KEY,
    display_name TEXT,
    price        INT,
    type         CHAR(64),
    efficiency   CHAR(64),
    wattage      INT,
    modular      CHAR(64),
    colour        CHAR(64),
    FOREIGN KEY (id) REFERENCES component (id)
);

CREATE TABLE IF NOT EXISTS computer_build
(
    id                UUID PRIMARY KEY,
    display_name      TEXT NOT NULL,
    description       TEXT,
    username          CHAR(64),
    creation_date     DATETIME,
    last_updated_date DATETIME,
    FOREIGN KEY (username) REFERENCES user_profile (username)
        ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS is_part_of
(
    component_id UUID,
    build_id     UUID,
    PRIMARY KEY (component_id, build_id),
    FOREIGN KEY (component_id) REFERENCES component(id)
        ON DELETE CASCADE,
    FOREIGN KEY (build_id) REFERENCES
        ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS computer_build_comment
(
    build_id          UUID,
    user_name         UUID,
    content           VARCHAR(2048),
    creation_date     DATETIME,
    last_updated_date DATETIME
);

# TODO: source data + make components depend on products
# CREATE TABLE IF NOT EXISTS retailer
# (
#     retailer_name CHAR(255) PRIMARY KEY,
#     display_name  TEXT,
#     href          CHAR(255)
# );
#
# CREATE TABLE IF NOT EXISTS product
# (
#     href          CHAR(255) PRIMARY KEY,
#     component_id  UUID,
#     retailer_name TEXT,
#     price         INT,
#     FOREIGN KEY (component_id) REFERENCES component (id)
#         ON DELETE CASCADE,
#     FOREIGN KEY (retailer_name) REFERENCES retailer (retailer_name)
#         ON DELETE CASCADE
# );
