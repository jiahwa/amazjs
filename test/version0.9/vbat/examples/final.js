    /**
     *  constant define area
     */
    const vBat = require("../src/vbat-0.1");
    
    const tempPath = __dirname+"/temp.json";
    const finalPath = __dirname+"/final.json";

    const VB = vBat();
    let file = VB.readFile(tempPath);

    const final = VB.inputToToolsConfig(file);//转换input到目标格式
    VB.writeFile(finalPath,final);//目标格式输出写入final
//写入final文件