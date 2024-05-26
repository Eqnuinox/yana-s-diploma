const { alias } = require('react-app-rewire-alias');

module.exports = function override(config, env) {
    alias({
        '@assets': 'src/assets',
        '@components': 'src/components',
        '@store': 'src/store',
        '@utils': 'src/utils',
        '@views': 'src/views'
    })(config);

    return config;
};
