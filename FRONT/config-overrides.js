const {override, fixBabelImports, addLessLoader} = require('customize-cra');
//'#F5EBD7',
module.exports = override(
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
    }),
    addLessLoader({
        javascriptEnabled: true,
        modifyVars: {
            '@primary-color': '#00A654',
            '@processing-color': '#00A654',
            '@info-color': '#5DFDCB',
            '@link-color': '#06B1E4',
            '@success-color': '#00A654',
            '@warning-color': '#FEC43D',
            '@error-color': '#f5222d',
            // '@layout-body-background': '#FFF',
            '@layout-header-background': '@primary-color',
        },
    }),
);