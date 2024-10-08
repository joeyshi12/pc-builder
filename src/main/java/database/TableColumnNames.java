package database;

final class TableColumnNames {
    static final String ID = "id";
    static final String DISPLAY_NAME = "display_name";
    static final String COLOUR = "colour";
    static final String FORM_FACTOR = "form_factor";
    static final String CORE_CLOCK = "core_clock";
    static final String BOOST_CLOCK = "boost_clock";
    static final String PRICE = "price";

    // CPU
    static final String CORE_COUNT = "core_count";
    static final String TDP = "tdp";
    static final String INTEGRATED_GRAPHICS = "integrated_graphics";
    static final String HAS_SMT = "has_smt";

    // Motherboard
    static final String CPU_SOCKET = "cpu_socket";
    static final String MAX_MEMORY = "max_memory";
    static final String NUM_MEMORY_SLOTS = "num_memory_slots";

    // Memory
    static final String DDR_VERSION = "ddr_version";
    static final String DDR_CLOCK = "ddr_clock";
    static final String NUM_MODULES = "num_modules";
    static final String MODULE_SIZE = "module_size";
    static final String FIRST_WORD_LATENCY = "first_word_latency";
    static final String CAS_LATENCY = "cas_latency";

    // Storage
    static final String CAPACITY = "capacity";
    static final String TYPE = "type";
    static final String CACHE_SIZE = "cache_size";
    static final String INTERFACE = "interface";

    // Video card
    static final String CHIPSET = "chipset";
    static final String MEMORY = "memory";
    static final String CARD_LENGTH = "card_length";

    // Power supply
    static final String EFFICIENCY = "efficiency";
    static final String WATTAGE = "wattage";
    static final String MODULAR = "modular";

    // Computer build
    static final String DESCRIPTION = "description";
    static final String USERNAME = "username";
    static final String CREATION_DATE = "creation_date";
    static final String LAST_UPDATED_DATE = "last_updated_date";

    // Column arrays
    static final String[] CPU_COLUMNS = {
            ID, DISPLAY_NAME, PRICE, CORE_COUNT, CORE_CLOCK, BOOST_CLOCK, TDP, INTEGRATED_GRAPHICS, HAS_SMT
    };
    static final String[] MOTHERBOARD_COLUMNS = {
            ID, DISPLAY_NAME, PRICE, CPU_SOCKET, FORM_FACTOR, MAX_MEMORY, NUM_MEMORY_SLOTS, COLOUR
    };
    static final String[] MEMORY_COLUMNS = {
            ID, DISPLAY_NAME, PRICE, DDR_VERSION, DDR_CLOCK, NUM_MODULES, MODULE_SIZE, COLOUR, FIRST_WORD_LATENCY, CAS_LATENCY
    };
    static final String[] STORAGE_COLUMNS = {
            ID, DISPLAY_NAME, PRICE, CAPACITY, TYPE, CACHE_SIZE, FORM_FACTOR, INTERFACE
    };
    static final String[] VIDEO_CARD_COLUMNS = {
            ID, DISPLAY_NAME, PRICE, CHIPSET, MEMORY, CORE_CLOCK, BOOST_CLOCK, COLOUR, CARD_LENGTH
    };
    static final String[] POWER_SUPPLY_COLUMNS = {
            ID, DISPLAY_NAME, PRICE, TYPE, EFFICIENCY, WATTAGE, MODULAR, COLOUR
    };
    static final String[] COMPUTER_BUILD_COLUMNS = {
            ID, DISPLAY_NAME, DESCRIPTION, USERNAME, CREATION_DATE, LAST_UPDATED_DATE
    };
}
