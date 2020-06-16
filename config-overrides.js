const { override, fixBabelImports,addDecoratorsLegacy  } = require("customize-cra");

//override生产webpack 的配置项
module.exports = override(  
    
    fixBabelImports("import", {   // antd 按需加载
        libraryName: "antd",    
        libraryDirectory: "es",    
        style: "css"
    }),
    addDecoratorsLegacy() // 装饰器
);
 