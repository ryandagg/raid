
module.exports = {
    /* Attack constants */
    MIN_RANGED_ATTACK_RADIUS_SQUARED: 16,
    MAX_RANGED_ATTACK_RADIUS_SQUARED: 49,
    MAX_MAGIC_ATTACK_RADIUS_SQUARED: 36,
    MAGIC_ATTACK_SPLASH_PERCENTAGE: .25,
    MAX_MELEE_ATTACK_RADIUS_SQUARED: 2,

    /* Sense constants */
    SENSE_EXIT_THRESHOLD: 144,

    /* Player constants */
    PLAYER_MOVE_DELAY: 2,
    PLAYER_HEAL_POWER: 50,
    PLAYER_HEAL_DELAY: 20,
    PLAYER_MELEE_POWER: 20,
    PLAYER_MELEE_DELAY: 2,
    PLAYER_MAGIC_POWER: 16,
    PLAYER_MAGIC_DELAY: 4,
    PLAYER_RANGED_POWER: 18,
    PLAYER_RANGED_DELAY: 3,

    /* Score constants */
    SCORE_MAP_CLEAR: 100,
    SCORE_ROUNDS_LEFT_MODIFIER: 0.5,
    SCORE_HP_LEFT_MODIFIER: 2,

    /* GameRunner constants */
    GAMERUNNER_ANIMATION_FRAME_CNT: 24, 

    /* Render Constants */
    RENDER_WITH_CANVAS: true, // setting to false will cause rendering to be done using HTML table 
};