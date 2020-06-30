(function (window, module) {
    /**
     * ---------------------------------------------------------
     * -- public area for 
     *                   Array ---------------------------------
     */
    if (!Array.prototype.last) {
        Array.prototype.last = function () {
            return this.length > 0 ? [this[this.length - 1]] : [];
        };
    }
    if (!Array.prototype.slicenosingal) {
        Array.prototype.slicenosingal = function () {
            return this.length > 1 ? this.slice(0, -1) : [];
        };
    }
    /**
     * =========================================================
     */

    /**
     * ---------------------------------------------------------
     * -- public area for 
     *                   String ---------------------------------
     */
    if (!String.prototype.toFirstABCUpperCase) {
        //first words change to uppercase
        String.prototype.toFirstABCUpperCase = function() {
            return this.replace(this.charAt(0), this.charAt(0).toUpperCase());
        };
    }
    /**
     * =========================================================
     */

    /**
     * ---------------------------------------------------------
     * -- define for 
     *              vBat ---------------------------------------
     * 
     */
    var
        version = '0.1',

        vBat = function () {
            return new vBat.fn.init();
        };

    vBat.fn = vBat.prototype = {
        version: version
    };

    var
        init = vBat.fn.init = function () {
            vBat.fn.extend(fs);
        };

    vBat.fn.extend = function () {
        let target = arguments[0],
            bool = arguments[1] || false;

        if (typeof target != "object") {
            target = {};
        }
        vBat.fn = Object.assign(vBat.fn, target);

        return vBat;

    };
    /**
     * =========================================================
     */

    /**
     * ---------------------------------------------------------
     * -- public fn for 
     *                 log -------------------------------------
     */
    var
        // log = vBat.fn.log = (info) =>{
        //     typeof info === "object"?function(){console.log("[object]$ ");console.dir(info);}()
        //         :process.stdout.write(`[${typeof info}]$ ${info}\n`);
        // };
        log = vBat.fn.log = console.dir;
    /**
     * =========================================================
     */

    /**
     * ---------------------------------------------------------
     * -- file system for 
     *                   fs ------------------------------------
     */
    var
        fs = {
            options: {
                ignore: [],
                one_imensional: [],
                times: new Number,
                tempSet:new Boolean,
                undressMap: {            //执行文件扫描时得到的关键内容，收集
                    "vpageList": [],     //page的路径存档
                    "inputList": [],     //输入存档
                    "outputList": [],    //输出存档
                    "shiftList": [],     //shift的路径存档
                    "fieldList": [],     //域作为一个单元存档
                    "tableList": [],     //表格作为一个单元存档
                    "pageIndexList": [],//二级页签碎片存档
                    "pageIndexTitleList": [],//二级页签标题存档
                    "trs_name": "",      //交易名字
                    "rootDir": "",       //根目录路径，htmls之前的本地磁盘路径
                    "shifts": [],        //shifs页面存档，针对v-shift标签下不经过url引入的结构
                    "inputFields": [],   //field域存档，要在扫描所有的文件之后得到完整内容
                    "outputFields": [],  //输出屏幕的域存档
                    "attrs": [],         //属性值组件，要在扫描所有的文件之后得到完整内容 !未用到
                    "expressions": [],   //exp表达式值存档，要在扫描所有的文件之后得到完整内容 !未用到

                }
            },
            setIgnore: (data) => {
                if (typeof data !== undefined && data instanceof Array)
                    fs.options.ignore = data;
            },
            filterIgnore: (ignore, all) => {
                if(ignore.length ==0 || all.length == 0){
                    return all;
                }
                
                let str = String(all);
                for (let i = 0; i<ignore.length; i++) {
                    let regExp = new RegExp('(^|,)'+ignore[i]+'(,|$)')
                    str = str.replace(regExp, '');
                }

                let arr = str.split(',');
                for(let i = 0; i<arr.length; i++){
                    if(arr[i] === ''){
                        arr.splice(i,1);
                    }
                }
                return arr;

            },
            filterExplanatoryNote: (fd) => {
                const regexp = new RegExp(/<!--(.|\s)+?-->/, 'g');
                if (fd == undefined) return fd;

                const map = fd.match(regexp);
                if (map == null) return fd;

                for (let i = 0; i < map.length; i++) {
                    fd = fd.replace(map[i], '');

                }

                return fd;
            },
            filterWhiteCharacter: (fd) => {
                const regexp1 = new RegExp(/[\r\n\f\t]/, 'g');
                const regexp2 = new RegExp(/\s{2,}/,'g');

                if (fd == undefined) return fd;

                return fd.replace(regexp1, ' ').replace(regexp2, ' ');
            },
            orderByMod1st: (list) => {
                const regexp = /([A-Za-z0-9]+_)?mod.html/;
                const match = String(list).match(regexp);

                if (match == null) {
                    return list;
                }

                const modName = match[0];
                const index = list.indexOf(modName);

                if (index == 0)
                    return list;

                let temp;

                temp = list[index];
                list[index] = list[0];
                list[0] = temp;

                return list;
            },
            getRootDir: (path) => {
                const index = path.indexOf('htmls');
                 return path.slice(0, index);
            },
            isOppositePath: (path) => {
                if(path != undefined)
                    return /\\/.test(path) != null;
            },
            routeFormate: (path) => {
                const regexp = new RegExp(/\\{1,}/,'g');

                if(path != undefined && fs.isOppositePath(path))
                    return path.replace(regexp,'/');

                return path;
            },
            record: (path, code) => {
                const recd = {
                    isFile: !fs.isDir(path),
                    type: fs.fileType(path),
                    code: code || null,
                    path: path

                };
                return fs.options.one_imensional.push(recd);

            },
            readDir: (path, condition, savecode) => {

                let files = require('fs').readdirSync(path, "utf8");
                const ignore = fs.options.ignore;
                const CATEGORY = "-R|-r";
                const MOD_REGEXP = /([A-Za-z0-9]+)?_?mod\.html/;
                const TRS_FOLDER_REGEXP = /\/([A-Za-z0-9]+)\/$/;

                files = fs.filterIgnore(ignore, files);//[ 'Accounting' ]

                //order eg: ['6201_mod.html','form','acctInterAcctInfoModify.js','acctInterAcctInfoModifyPre.html','acctInterAcctInfoModifyRes.html']
                files = fs.orderByMod1st(files);

                const map = String(files).match(MOD_REGEXP) || path.match(TRS_FOLDER_REGEXP);
                const code = map != null ? map[1] : savecode; // 此处更新 [交易码]

                // fs.record(path,code);//为文件夹目录做记录

                if (condition !== undefined && CATEGORY.includes(condition)) {

                    condition = 'readDir' + condition.replace(/-/g, '_').toUpperCase();//合成方法，如readDir_R
                    for (var i = 0; i < files.length; i++) {
                        if (fs.hasOwnProperty(condition)) {
                            fs[condition](path, files[i], code);
                        }
                    }

                    return fs.options.one_imensional;
                } else
                    return files;
            },
            readDir_R: (path, file, code) => {
                path = require('path').join(path, file);
                if (fs.isExists(path)) {
                    if (fs.isDir(path)) {
                        fs.readDir(path, "-R", code);
                    } else if (fs.isFile(path)) {
                        if (fs.isEntranceModFile(path)) {//过滤mod后缀的文件
                            fs.record(path, code);//为文件目录做记录
                        }

                    }
                }


            },
            isExists: (path) => {
                if (path != undefined)
                    return require('fs').existsSync(path);
            },
            isFile: (path) => {
                if (path != undefined)
                    return require('fs').statSync(path).isFile();
            },
            isDir: (path) => {
                if (path != undefined)
                    return require('fs').statSync(path).isDirectory();
            },
            isJavaScriptFile: (path) => {
                if (path != undefined)
                    return fs.isFileTypeCorrect(path, 'js');
            },
            isHtmlFile: (path) => {
                if (path != undefined)
                    return fs.isFileTypeCorrect(path, 'html');
            },
            isEntranceModFile: (path) => {
                if (path != undefined)
                    return path.includes("mod.html");
            },
            isFileTypeCorrect: (path, typeStr) => {
                if (path != undefined && typeStr != undefined)
                    return fs.fileType(path) === typeStr.toLowerCase();
            },
            isSpecifiedPiecePath: (path) => {
                const regexp = /^htmls[a-zA-Z0-9_\$\-\\\/]+/;

                if(path != undefined)
                    return regexp.test(path);           
            },
            fileType: (path) => {
                if (path != undefined)
                    return require('path').extname(path).slice(1);
            },
            readFile: (path) => {
                if (path != undefined)
                    return require('fs').readFileSync(path, 'utf8');
            },
            mkdirSync: (path ) => {
                if (path != undefined)
                    require('fs').mkdirSync(path);
            },
            rm: (path) => {
                if(path != undefined)
                    require('fs').unlinkSync(path);
            },
            rmdirSync: (path) => {
                if(fs.isExists(path)){
                    const files = require('fs').readdirSync(path);
                    files.forEach((file)=>{
                        const curr = require('path').join(path, file);

                        if(fs.isDir(curr)){
                            fs.rmdirSync(curr);
                        }else{
                            fs.rm(curr);
                        }

                    });

                    require('fs').rmdirSync(path);
                }
            },
            getFromFdInfo: (info) => {
                if(info == undefined)
                    return undefined;
                
                //分析info数据
                if(Object.keys(info).length ==0){//找到了page1
                    info["pageIndex"] = 0;
                }else if(!info.hasOwnProperty("pageEnd")){
                    info["pageIndex"] ++;
                }else if(!info.hasOwnProperty("shiftIndex")){
                    info["shiftIndex"] = 0;
                }else if(!info.hasOwnProperty("shiftEnd")){
                    info["shiftIndex"] ++;
                }else if(!info.hasOwnProperty("pageIndexIndex")){
                    info["pageIndexIndex"] = 0;
                }else if(!info.hasOwnProperty("pageIndexEnd")){
                    info["pageIndexIndex"] ++;
                }

                return info;
            },
            pathComplement: (path) => {
                if(path !=undefined)
                    return require('path').join(fs.options.undressMap.rootDir,path);
            },
            recursion: (fd, REGEXP, matchRules, fdInfo, tempList) => {
                const matcher = REGEXP.exec(fd) || [];
                let value;

                if (tempList == undefined) {
                    tempList = [];
                }
                if (REGEXP.lastIndex != 0) {
                    //解读fdInfo的信息
                    const info = fs.getFromFdInfo(fdInfo);

                    if (typeof matchRules == "string") {  //matchRules规则，eg：1?1:true

                        const regExpArr = matchRules.match(/^(.+?)\?(.+?)\:(.+?)$/)||[];
                        const condition = matcher[regExpArr[1]];
                        const caseTrue = !isNaN(regExpArr[2]) ? matcher[regExpArr[2]] : regExpArr[2];
                        const caseFalse = !isNaN(regExpArr[3]) ? matcher[regExpArr[3]] : regExpArr[3];

                        value = condition ? caseTrue : caseFalse;
                    } else if (typeof matchRules == "number") {
                        value = matcher[matchRules]
                    }

                    //是路径的一部分的情况，先规范化
                    value = fs.routeFormate(value);
                    if(info != undefined){
                        tempList.push(Object.assign({},info,{value}));//相应列表中记录
                    }else{
                        tempList.push(value);
                    }

                    fs.recursion(fd, REGEXP, matchRules, info, tempList);
                }

                return tempList;

            },
            /**
             * 根据内容、正则表达式、筛选规则、、内容附加信息四个参数，即可以数组格式返回匹配结果
             */
            analysisByRegexp: (fd, regexp, matchRules, fdInfo) => {

                if (!"number string".includes(typeof matchRules)) {
                    console.error(`Type error, number or string you'd choose one!`);
                }

                if(fs.isSpecifiedPiecePath(fd)){
                    let path = fd;
                    fd = fs.pathComplement(path);
                }

                if (fs.isExists(fd) && fs.isFile(fd)) {//同样支持路径
                    let path = fd;
                    fd = fs.readFile(path);
                }

                fd = fs.filterExplanatoryNote(fd);  //过滤无用的字符，如注释<!-- ... ->
                fd = fs.filterWhiteCharacter(fd);   ///过滤无用的白字符，如\r\n\f\t，合并多个空格字符\s\s为一个

                let arr = fs.recursion(fd, new RegExp(regexp, 'g'), matchRules, fdInfo);

                return arr;
            },
            analysisModFile: (path) => {
                const REGEXP = /v-page\s+href=\"(htmls(\/|\\)[A-Za-z0-9_\.\/\\\-]+)\"/;
                const matchRules = 1;
                const fdInfo = {};
                fs.options.undressMap.vpageList = fs.analysisByRegexp(path, REGEXP, matchRules, fdInfo);
                fs.updateScannedResult();//更新

                return fs.options.undressMap;

            },
            analysisPageFile: (pageObj) => {
                const pageIndex = pageObj.pageIndex;
                const path = pageObj.value;              
                const pathInfo = {pageIndex,pageEnd:true};
                const REGEXPARRAY = [
                    {
                        REGEXP: /v-shift\s+href=\"(htmls(\/|\\)[A-Za-z0-9_\.\/\\\-]+)\"/, //v-shift
                        matchRules: 1
                    }, {
                        REGEXP:
                            '<div v-shift>\\s?' +
                            '<div( ui-transfer-item)?>(.+?)'+
                            '(</div>\\s?){3}' +
                            '<div class="buttondiv">', //v-shift的直接内嵌形式
                        matchRules: 2
                    }
                ];
                const shiftListItem = fs.analysisByRegexp(path, REGEXPARRAY[0].REGEXP, REGEXPARRAY[0].matchRules, pathInfo);
                const shiftsItem = fs.analysisByRegexp(path, REGEXPARRAY[1].REGEXP, REGEXPARRAY[1].matchRules, pathInfo);

                fs.options.undressMap.shiftList = fs.options.undressMap.shiftList.concat(shiftListItem);
                fs.options.undressMap.shifts = fs.options.undressMap.shifts.concat(shiftsItem);
                
                return fs.options.undressMap;
            },
            analysisShiftFile: (pageInnerObj) => {
                const pageIndex = pageInnerObj.pageIndex;
                const shiftIndex = pageInnerObj.shiftIndex;
                const path = pageInnerObj.value;              
                const pathInfo = {pageIndex,pageEnd:true,shiftIndex,shiftEnd:true};
                const REGEXPARRAY = [
                    {
                        REGEXP:
                            '(-index([A-Za-z0-9=\"\'\\s]+)?>(.+?)<div page)'+
                            '|(-index([A-Za-z0-9=\"\'\\s]+)?>(.*)(</div>\\s?){2}$)',
                        matchRules: '3?3:6'
                    },{
                        REGEXP:
                            '<li>\\s?<a([A-Za-z0-9=\"\'\:\{\}\,\-\\s]+)?>(.+?)'+
                            '</a>\\s?</li>',
                        matchRules: 2,
                        pathInfo:{pageIndex,pageEnd:true,shiftIndex,shiftEnd:true}
                    }

                ];
                const pageIndexListItem = fs.analysisByRegexp(path, REGEXPARRAY[0].REGEXP, REGEXPARRAY[0].matchRules, pathInfo);
                const pageIndexTitleListItem = fs.analysisByRegexp(path, REGEXPARRAY[1].REGEXP, REGEXPARRAY[1].matchRules, REGEXPARRAY[1].pathInfo);

                fs.options.undressMap.pageIndexList = fs.options.undressMap.pageIndexList.concat(pageIndexListItem);
                fs.options.undressMap.pageIndexTitleList = fs.options.undressMap.pageIndexTitleList.concat(pageIndexTitleListItem);

                return fs.options.undressMap;
            },
            analysisPageIndex: (fdObj) => {
                const pageIndex = fdObj.pageIndex;
                const shiftIndex = fdObj.shiftIndex;
                const pageIndexIndex = fdObj.pageIndexIndex;
                const fd = fdObj.value;
                const fdInfo = {pageIndex,pageEnd:true,shiftIndex,shiftEnd:true,pageIndexIndex,pageIndexEnd:true};
                const REGEXPARRAY = [
                    {
                        REGEXP:
                            '<div class="col-md-([0-9]{1,})">\\s?' +
                            '<div.+?>\\s?' +
                            '<label([A-Za-z0-9=_\"\'\-\\s]+)?>.+?</label>\\s?' +
                            '(<div class="select_input.+?>\\s?)?' +
                            '<(input|span).+?>\\s?' +
                            '(</div>\\s?){2}',
                        matchRules: 0
                    },
                    {
                        REGEXP:
                            '(<div class="yytit"( style=".+?")?>\\s?' +
                            '<div class="titdiv"( style=".+?")?>.+?(</div>\\s?){2})?'+
                            '(<div class="yytit"( style=".+?")?>\\s?'+
                            '</div>\\s)?' +
                            '<div class="listdiv.+?>\\s?' +
                            '<table.+?(</table>)\\s?' +
                            '</div>',
                        matchRules: 0
                    }

                ];

                const fieldItem = fs.analysisByRegexp(fd, REGEXPARRAY[0].REGEXP, REGEXPARRAY[0].matchRules, fdInfo);
                const tableItem = fs.analysisByRegexp(fd, REGEXPARRAY[1].REGEXP, REGEXPARRAY[1].matchRules, fdInfo);
                
                fs.options.undressMap.fieldList = fs.options.undressMap.fieldList.concat(fieldItem);
                fs.options.undressMap.tableList = fs.options.undressMap.tableList.concat(tableItem);

                return fs.options.undressMap;
            },
            analysisFieldElement: (field) => {
                let map = {};
                const REGEXPARRAY = [
                    {
                        REGEXP: '<input .+?v-model="[0-9a-zA-Z_]+\.([0-9a-zA-Z_].+?)\\s*"',   //v-model
                        matchRules: 1,
                        name: 'vModel'
                    },
                    {
                        REGEXP: 'type="(text|password|file)"',  //field type
                        matchRules: 1,
                        name: 'type'
                    },
                    {
                        REGEXP: '<label([A-Za-z0-9=_\"\'\-\\s]+)?>(.+)</label>',  //label
                        matchRules: 2,
                        name: 'label'
                    },
                    {
                        REGEXP: 'ui-select2=".+?in\\s([A-Za-z0-9_]+)List"', //select
                        matchRules: 1,
                        name: 'uiSelect'
                    },
                    {
                        REGEXP: 'v-enter="(.+?)\\(',  //v-enter
                        matchRules: 1,
                        name: 'v-enter'
                    },
                    {
                        REGEXP: 'v-change=".+?\\(', //v-change
                        matchRules: 1,
                        name: 'v-change'
                    },
                    {
                        REGEXP: 'v-blur=".+?\\(',   //v-blur
                        matchRules: 1,
                        name: 'v-blur'
                    },
                    {
                        REGEXP: 'disabled="(.+?)"',    //v-disabled
                        matchRules: '1?1:true',
                        name: 'v-disabled'
                    },
                    {
                        REGEXP: '(required[^=])|(v-required="(.+?)")',  //v-required
                        matchRules: '3?3:true',
                        name: 'v-required'
                    },
                    {
                        REGEXP: 'v-model="[A-Za-z0-9_]+\.([0-9a-zA-Z]+)".+?ui-amount',  //ui-amount
                        matchRules: '1?true:false',
                        name: 'ui-amount',
                    },
                    {
                        REGEXP: '(ui-number[^=])|(ui-number=\'(.+?)\')',    //ui-number
                        matchRules: '3?3:true',
                        name: 'ui-number'
                    },
                    {
                        REGEXP: 'v-model="[A-Za-z0-9_]+\.([0-9a-zA-Z]+)".+?ui-pattern="(.+?)"',   //ui-pattern
                        matchRules: 2,
                        name: 'ui-pattern'
                    },
                    {
                        REGEXP: 'v-model="[A-Za-z0-9_]+\.([0-9a-zA-Z]+)".+?ui-date-input',    //ui-date-input
                        matchRules: '1?true:false',
                        name: 'ui-date-input'
                    },
                    {
                        REGEXP: 'v-model="[A-Za-z0-9_]+\.([0-9a-zA-Z]+)".+?ui-time-input',    //ui-time-input
                        matchRules: '1?true:false',
                        name: 'ui-time-input'
                    },
                    {
                        REGEXP: 'repeat="([A-Za-z0-9_]+)List"',   //table ui-myselect repeat
                        matchRules: 1,
                        name: 'ui-myselect'
                    },
                    {
                        REGEXP: '\\sv-bind="[0-9a-zA-Z_]+\.((([0-9a-zA-Z_]+)\\+.+?)|([0-9a-zA-Z_]+))("|.+?")',   //output v-bind
                        matchRules: '3?3:4',
                        name: 'vBind'
                    },
                    {
                        REGEXP: '\\sv-bind=".+?\\+\\s*([0-9a-zA-Z_]+)List\\[.+?"',   //output select
                        matchRules: 1,
                        name: 'vBindSelect'
                    },
                    {
                        REGEXP: '\\sv-bind=".+?\\|\\s*([0-9a-zA-Z_:\|\'\/]+)\\s*"',   //output filter
                        matchRules: 1,
                        name: 'filter'
                    }

                ];

                for (let i = 0; i < REGEXPARRAY.length; i++) {
                    const e = REGEXPARRAY[i];
                    map[e.name] = fs.analysisByRegexp(field, e.REGEXP, e.matchRules)[0];
                }

                return map;
            },
            analysisTableElement: (table) => {
                let map = {};
                const REGEXPARRAY = [
                    {
                        REGEXP:
                            '<div class="titdiv"( style=".+?")?>\\s+?(.+?)\\s+?<',  //table title
                        matchRules: 2,
                        name: 'tableTitle'
                    },
                    {
                        REGEXP:
                            '<thead>(.+?)' +
                            '</thead>',  //table thead title
                        matchRules: 1,
                        name: 'tableHeads'
                    },
                    {
                        REGEXP:
                            'v-repeat=".+?(\.)?([0-9a-zA-Z_]+)"',  //table repeat
                        matchRules: 2,
                        name: 'tableRepeat'
                    },
                    {
                        REGEXP:
                            '<tr.+?>\\s?(<td.+?)</tr>',  //table inputFields
                        matchRules: 1,
                        name: 'tableFields'
                    },
                    {
                        REGEXP:
                            '(<table.+?ui-grid.+?>)|(<table.+?>)',  //input table or output table
                        matchRules: '1?IN:OUT',
                        name: 'tableType'
                    }
                ];
                
                for (let i = 0; i < ['0','2','4'].length; i++) {
                    const e = ['0','2','4'][i];
                    map[REGEXPARRAY[e].name] = fs.analysisByRegexp(table, REGEXPARRAY[e].REGEXP, REGEXPARRAY[e].matchRules)[0];
                }

                let tableHead = fs.analysisByRegexp(table, REGEXPARRAY[1].REGEXP, REGEXPARRAY[1].matchRules)[0];
                map["tableHeads"] = fs.analysisTableHeadElement(tableHead);//获取到thead的title列表

                let tableField = fs.analysisByRegexp(table, REGEXPARRAY[3].REGEXP, REGEXPARRAY[3].matchRules)[0];
                map["tableFields"] = fs.analysisTableFieldElement(tableField);

                return map;
            },
            analysisTableHeadElement: (head) => {
                const REGEXP = '<th([A-Za-z0-9=_\"\'\-\\s]+)?>(.+?)</th>';  //table thead title
                const matchRules = 2;
                const headList = fs.analysisByRegexp(head, REGEXP, matchRules);

                return headList;
            },
            analysisTableFieldElement: (field) => {
                const REGEXP = '<td.+?</td>';  //table field
                const matchRules = 0;
                const fieldList = fs.analysisByRegexp(field, REGEXP, matchRules);

                let tempArr = [];//临时存放的数组
                for (let i = 0; i < fieldList.length; i++) {
                    const e = fieldList[i];
                    const field = fs.analysisFieldElement(e);

                    tempArr.push(field);
                }

                return tempArr;
            },
            analysisFile: function (path, code) {

                let undressMap;

                fs.options.undressMap.trs_name = code;
                fs.options.undressMap.rootDir = fs.getRootDir(path);

                //区分出是什么文件
                //1. 入口文件 mode
                if (fs.isEntranceModFile(path)) {
                    undressMap = fs.analysisModFile(path);

                    const case0 = ['inputList', 'outputList'];
                    // log(`下一步扫描: inputList/outputList`);
                    for (let i = 0; i < case0.length; i++) {
                        let arrName = case0[i];
                        for (let j = 0; j < undressMap[arrName].length; j++) {
                            const element = undressMap[arrName][j];

                            undressMap = fs.analysisPageFile(element);
                        }
                    }

                    const case1 = ['shiftList', 'shifts'];
                    // log(`下一步扫描：shiftList/shifts`);
                    for (let i = 0; i < case1.length; i++) {
                        let arrName = case1[i];

                        for (let j = 0; j < undressMap[arrName].length; j++) {
                            const element = undressMap[arrName][j];

                            undressMap = fs.analysisShiftFile(element);
                        }
                    }

                    const case3 = "pageIndexList";
                    for (let i = 0; i < undressMap[case3].length; i++) {
                        const element = undressMap[case3][i];

                        undressMap = fs.analysisPageIndex(element);
                        
                    }

                    const case2 = ['fieldList', 'tableList','pageIndexTitleList'];
                    // log(`下一步扫描：fieldList/tableList/pages`);
                    for (let i = 0; i < case2.length; i++) {
                        let arrName = case2[i];

                        for (let j = 0; j < undressMap[arrName].length; j++) {//*
                            const element = undressMap[arrName][j];
                            const shiftLevel = element.shiftIndex;//获取field所属的shiftlevel，并按下标排列放入数组
                            const pageIndexIndex = element.pageIndexIndex;//获取field所属的pageIndexlevel，并按下标排列放入数组
                            let field;

                            if (i == 0) {
                                field = fs.analysisFieldElement(element.value);
                            } else if(i == 1) {
                                field = fs.analysisTableElement(element.value);
                            }else if(i == 2){
                                field = element;
                            }
                            if(field.vModel !=undefined || field.tableType == 'IN'){
                                fs.classifyByShiftLevel(fs.options.undressMap.inputFields,shiftLevel,pageIndexIndex,field);
                            }else if(field.vBind != undefined || field.tableType == 'OUT'){
                                fs.classifyByShiftLevel(fs.options.undressMap.outputFields,shiftLevel,pageIndexIndex,field);
                            }else if(i == 2){
                                fs.addClassifyByPageIndexTitle(field);
                            }
                        }
                    }

                }

                //2. 录入/结果 htlm文件
                //3. js文件

                const returnData = JSON.parse(JSON.stringify(fs.options.undressMap));//深层拷贝
                fs.reset(fs.options);

                return returnData;
            },
            updateScannedResult: () => {
                fs.options.undressMap.inputList = fs.options.undressMap.vpageList.slicenosingal();
                fs.options.undressMap.outputList = fs.options.undressMap.vpageList.last();
            },
            timeBacker: (str) => {
                let times = ++fs.options.times;
                return str != null ? str + '_' + new Date().getTime() + times : 'Untitled-' + times;
            },
            reset: (obj) => {
                if (obj == undefined) {
                    obj = fs.options; // 初始化
                }
                for (let i in obj) {
                    let value = obj[i];

                    if (typeof value == "string") {
                        obj[i] = undefined;
                    } else if (value == "number") {
                        obj[i] = new Number;
                    } else if (value == "boolean") {
                        obj[i] = new Boolean;
                    } else if (value instanceof Array) {
                        obj[i] = new Array;
                    } else if (value instanceof Object) {
                        fs.reset(obj[i]);
                    }
                }

            },
            classifyByShiftLevel: (list,shiftIndex,pageIndexIndex,item) =>{
                if(list[shiftIndex] == undefined){
                    list[shiftIndex] = {list:[]};
                }
                if(list[shiftIndex].list[pageIndexIndex] == undefined){
                    list[shiftIndex].list[pageIndexIndex] = {list:[]};
                }
                list[shiftIndex].list[pageIndexIndex].list.push(item);
                return list;
            },
            addClassifyByPageIndexTitle: (field) => {
                const pageIndex = field.pageIndex,
                        shiftIndex = field.shiftIndex,
                        pageIndexIndex = field.pageIndexIndex,
                        title = field.value,
                        arrayName = pageIndex == 0 ? 'inputFields' : 'outputFields';
                if(fs.options.undressMap[arrayName][shiftIndex] == undefined){
                    return false;
                }

                const isTabs = fs.options.undressMap[arrayName][shiftIndex].list.length>1;
                if(isTabs){
                    fs.options.undressMap[arrayName][shiftIndex].list[pageIndexIndex].title = title;
                }
                
            },
            vbToToolsConfig: (data) => {
                /**
                 * 内部函数定义开始-----------------------------
                 */
                var struct = {
                    "x": 3,
                    "y": 1,
                    "loop": new Boolean,
                    "title": new String,
                    "exp": {
                        "code": {},
                        "xml": {}
                    },
                    "box": [],
                    "name": new String,
                    "data": {},
                    "type": new String,
                    "mode": new String

                };
                var unit_loop = (bool) => {
                    struct.loop = bool;
                    return struct.loop;
                };
                var unit_name = (code, index) => {
                    struct.name = `${code}_page_${index}`;//命名，可以采用code_page_index
                    return struct.name;
                };
                var unit_title = (title) => {
                    struct.title = title;
                    return struct.title;
                };
                /**
                 * 暂时使用默认值，方法预留不作调用
                 */
                var unit_xy = () => {
                    //todo
                    struct.x = "2";
                    struct.y = "1";
                    return true;
                };
                var unit_type = (type) => {
                    struct.type = type || "input";
                    return struct.type;
                };
                var unit_mode = (isTabs) => {
                    let mode = isTabs ? 'tabs':'normal';
                    struct.mode = mode;
                    return struct.mode;
                };
                var unit_data_attr44_attr45 = (key, value) => {
                    let obj = {};
                    obj[key] = value;
                    struct.data = Object.assign(struct.data, obj);

                    return struct.data
                };
                var unit_code_exp = (boolean) => {
                    let obj = {};
                    const key = fs.timeBacker('exp');
                    obj[key] = boolean;
                    struct.exp.code = Object.assign(struct.exp.code, obj);

                    return key;
                };
                var unit_veAttr_select = function () {
                    const arg = arguments;
                    const field =   arg[0];
                    const fieldNm = arg[1];
                    const select =  arg[2];
                    const selectTp = arg[3];
                    let attrs = {
                        "ve-attr44": undefined,//字段-上传扩展属性-域字典
                        "ve-attr45": undefined,//字段-上传扩展属性-域名称
                        "ve-attr89": undefined,//字段-展示表格扩展属性-列域字典，44、45和89、90互斥
                        "ve-attr90": undefined,//字段-展示表格扩展属性-列域名称
                        "ve-attr47": undefined,//字段-域基本属性-枚举列表定义，47与103互斥
                        "ve-attr103": undefined,//字段-输入/展示表格扩展属性-列域下拉列表代码
                    };
                    if(selectTp == 'normalTp'){ //普通域，含输入输出
                        attrs["ve-attr44"] = field;
                        attrs["ve-attr45"] = fieldNm;
                        attrs["ve-attr47"] = select.toFirstABCUpperCase();
                    }

                    return attrs;
                };
                var unit_veFunc_select = function () {
                    const arg = arguments;
                    const funcs = {
                        "ve-func64": arg[0],//字段-域前基本属性-联动展示方式
                        "ve-func69": arg[1],//字段-域后基本属性-联动展示方式
                        "ve-func77": arg[2],//字段-下拉框扩展属性-下拉列表类型
                        "ve-func78": arg[3],//字段-下拉框扩展属性-下拉列表源类型
                        "ve-func128": arg[4]//字段-域基本属性-默认值
                    };

                    return funcs;
                };
                /**
                 * 暂时返回为{}，方法预留
                 */
                var unit_veOpt_select = function () {
                    const arg = arguments;
                    const opts = {
                    };
                    if (arg.length > 0) {
                        unit_code_exp(arg[0]);

                    }
                    return opts;
                };
                /**
                 * 根据input/output类型确定selct域-id前缀
                 */
                var unit_veId_select = function() {
                    const arg = arguments;
                    if(arg[0] == "input"){
                        return fs.timeBacker('select');
                    }else if(arg[0] == "output"){
                        return fs.timeBacker('echo2');
                    }
                    return false;
                };
                /**
                 * select域
                 */
                var unit_box_select = function () {
                    const arg = arguments;
                    const field =           arg[0],//域字典
                        fieldNm =           arg[1],//域名称
                        select =            arg[2],//枚举列表定义
                        FBeforeLinkageTp =  arg[3],//字段-域前基本属性-联动展示方式，默认0-无
                        FAfterLinkageTp =   arg[4],//字段-域后基本属性-联动展示方式，默认0-无
                        FEnumTp =           arg[5],//字段-下拉框扩展属性-下拉列表类型，默认0-单选型
                        FEnumSourceTp =     arg[6],//字段-下拉框扩展属性-下拉列表源类型，默认1-动态定义型
                        defaults =          arg[7],//字段-域基本属性-默认值，默认空
                        selectTp =          arg[8],//枚举列表归属类型，普通型/表格嵌入型
                        structTp =          arg[9];//input/output


                    let obj = {};
                    obj["id"] = unit_veId_select(structTp);
                    obj["attr"] = unit_veAttr_select(field, fieldNm, select, selectTp);
                    obj["func"] = unit_veFunc_select(FBeforeLinkageTp, FAfterLinkageTp, FEnumTp, FEnumSourceTp, defaults);
                    obj["opt"] = unit_veOpt_select();
                    obj["type"] = obj["id"].split("_")[0];
                    obj["x"] = "2";

                    return obj;
                };


                var unit_veAttr_text = function () {
                    const arg = arguments;
                    const attrs = {
                        "ve-attr44": arg[0],//字段-上传扩展属性-域字典
                        "ve-attr45": arg[1],//字段-上传扩展属性-域名称
                        "ve-attr48": arg[2],//字段-域基本属性-数据类型
                        "ve-attr57": arg[3],//字段-域基本属性-是否需要二次录入
                        "ve-attr58": arg[4],//字段-域基本属性-输入方式
                        "ve-attr75": arg[5],//字段-输入框扩展属性-长度不足自动补齐方式
                        "ve-attr76": arg[6],//字段-输入框扩展属性-长度不足自动补齐默认值
                        "ve-attr50": arg[7],//整数位
                        "ve-attr51": arg[8]//小数精度
                    };

                    return attrs;
                };
                var unit_veFunc_text = function () {
                    const arg = arguments;
                    const funcs = {
                        "ve-func64": arg[0],//字段-域前基本属性-联动展示方式
                        "ve-func69": arg[1],//字段-域后基本属性-联动展示方式
                        "ve-func128": arg[2],//字段-域基本属性-默认值
                    };

                    return funcs;
                };
                var unit_veOpt_text = function () {
                    const arg = arguments;
                    if (arg.length > 0) {
                        arg[0] = unit_code_exp(arg[0]);

                    }
                    let opts = {
                        "ve-opt53": arg[0],//字段-域基本属性-必输达成条件
                    };

                    return opts;
                };
                var unit_veId_text = function() {
                    const arg = arguments;
                    if(arg[1] == "file"){
                        return fs.timeBacker('upload');
                    }else if(arg[0] == "input"){
                        return fs.timeBacker('text');
                    }else if(arg[0] == "output"){
                        return fs.timeBacker('echo1');
                    }
                    return false;
                };
                var unit_box_text_dataTp = function() {
                    const fieldItem = arguments[0];
                    const structTp = arguments[1];

                    if (structTp == "input"){
                        const textOrPassword = fieldItem["type"],
                            numberOrRate = fieldItem["ui-number"],
                            date = fieldItem["ui-date-input"],
                            time = fieldItem["ui-time-input"],
                            amount = fieldItem["ui-amount"],
                            frequency = fieldItem["ui-freqdialog"];

                        /*[text|number|date|time|amount|rate|password|frequency]
                        *按照顺序排列
                        */
                        let dataTp = "0";//默认text
                        let autoQiTp = "0";//默认0-无
                        let autoQiVal = undefined;//默认无值
                        let intLength = undefined;//number/rate的整数部分
                        let dotLength = undefined;//number/rate的小数部分

                        if(textOrPassword == "password"){
                            dataTp = "6";
                        }else if(numberOrRate != undefined){
                            if(numberOrRate == "true"){
                                dataTp = "1";
                                dotLength = 2;
                            }else{
                                const obj = JSON.parse(numberOrRate);
                                const float = obj.float;
                                const addZero = obj.addZero;

                                intLength = obj.intLength;
                                dotLength = obj.dotLength;
                                        
                                if(dotLength == "7"){
                                    dataTp = "5";
                                }else if(intLength == "8" && addZero == "true"){
                                    autoQiTp = "1";//暂定所有为1-左补齐
                                    autoQiVal = "0";//暂定所有默认值0
                                }
                            }
                        }else if(date == "true"){
                            dataTp = "2";
                        }else if(time == "true"){
                            dataTp = "3";
                        }else if(amount == "true"){
                            dataTp = "4";
                        }else if(frequency != undefined){
                            dataTp = "7";
                        }

                        return {dataTp,autoQiTp,autoQiVal,intLength,dotLength};
                    } else if(structTp == "output"){
                        let dataTp = "0";//默认text

                        if(fieldItem["filter"] == undefined)
                            return {dataTp};
                        
                        let filterMap = fieldItem["filter"].split(":");
                        let filterNm = filterMap[0].trim();
                        let filterSign = filterMap[1]&&filterMap[1].trim();
                        /*[text|number|date|time|amount|rate|password|frequency]
                        *按照顺序排列
                        */

                        switch(filterNm){
                            case 'number':
                                filterSign == "2"?dataTp = "1":(filterSign == "7"?dataTp = "5":undefined);
                                break;
                            case 'dateFilter':
                                dataTp = "2";
                                break;
                            case 'timeFilter':
                                dataTp = "3";
                                break;
                            default:
                                break;
                        }
                        return {dataTp};
                    }
                    return false;
                    
                };
                /**
                 * text域
                 */
                var unit_box_text = function () {
                    const arg = arguments;
                    const field =         arg[0],//字段-上传扩展属性-域字典
                        fieldNm =       arg[1],//字段-上传扩展属性-域名称
                        dataTp =        arg[2],//字段-域基本属性-数据类型，默认0-文本类型
                        isSecInput =    arg[3],//字段-域基本属性-是否需要二次录入，默认0-不需要
                        inputTp =       arg[4],//字段-域基本属性-输入方式，默认0-键盘录入
                        autoQiTp =      arg[5],//字段-输入框扩展属性-长度不足自动补齐方式，默认0-无
                        autoQiVal =         arg[6],//字段-输入框扩展属性-长度不足自动补齐默认值
                        intLength =         arg[7],//整数位
                        dotLength =         arg[8],//小数精度
                        FBeforeLinkageTp =  arg[9],//字段-域前基本属性-联动展示方式，默认0-无
                        FAfterLinkageTp =   arg[10],//字段-域后基本属性-联动展示方式，默认0-无
                        defaults =          arg[11],//字段-域基本属性-默认值，默认空
                        structTp =          arg[12],//域类型input/output
                        type =              arg[13];//域的类型 text/password/file
                        

                    let obj = {};
                    obj["id"] = unit_veId_text(structTp,type);;
                    obj["attr"] = unit_veAttr_text(field, fieldNm, dataTp, isSecInput, inputTp, autoQiTp, autoQiVal, intLength, dotLength);
                    obj["func"] = unit_veFunc_text(FBeforeLinkageTp, FAfterLinkageTp, defaults);
                    obj["opt"] = unit_veOpt_text("true");
                    obj["type"] = obj["id"].split("_")[0];
                    obj["x"] = "2";

                    return obj;
                };
                
                var unit_veAttr_table = function() {
                    const arg = arguments;
                    const structTp = arg[6];
                    const attrs1 = {
                        "ve-attr131":   arg[0],//字段-展示表格扩展属性-表格ID
                        "ve-attr85":    arg[1],//字段-输入表格扩展属性-表格是否可编辑
                        "ve-attr86":    arg[2],//字段-展示表格扩展属性-表格是否显示序列号
                        "ve-attr87":    arg[3],//字段-输入表格扩展属性-表格是否支持右键导入
                        "ve-attr88":    arg[4],//字段-输入表格扩展属性-表格是否支持右键导出
                        "ve-attr132":    arg[5]//字段-展示表格扩展属性-表格名称
                    };
                    const attrs2 = {
                        "ve-attr106":   arg[7],//字段-展示表格扩展属性-表格是否支持自定义排序
                        "ve-attr86":    arg[2],//arg[2],//字段-展示表格扩展属性-表格是否显示序列号
                        "ve-attr108":   arg[4],//字段-展示表格扩展属性-表格是否支持右键导出，与attr88同
                        "ve-attr109":   arg[8],//字段-展示表格扩展属性-表格列是否可详情显示
                        "ve-attr131":   arg[0]//字段-展示表格扩展属性-表格ID
                    }

                    return structTp == 'input'? attrs1:attrs2;
                    
                };
                /**
                 * 暂时返回为{}，方法预留
                 */
                var unit_veFunc_table = function() {
                    const arg = arguments;
                    const funcs = {
                    };

                    return funcs;
                };
                /**
                 * 暂时返回为{}，方法预留
                 */
                var unit_veOpt_table = function() {
                    const arg = arguments;
                    const opts = {
                    };
                    if (arg.length > 0) {
                        unit_code_exp(arg[0]);

                    }

                    return opts;
                };
                
                var unit_veAttr_col_item = function() {
                    const arg = arguments;
                    const structTp = arg[10];
                    const attrs = {
                        "ve-attr91":    arg[0],//字段-输入/展示表格扩展属性-列域形式
                        "ve-attr92":    arg[1],//字段-输入/展示表格扩展属性-数据类型
                        "ve-attr130":   arg[2],//字段-输入表格扩展属性-列域是否显示
                        "ve-attr99":    arg[3],//字段-输入表格扩展属性-列域自动补齐方式
                        "ve-attr100":   arg[4],//字段-输入表格扩展属性-列域自动补齐默认值
                        "ve-attr94":    arg[5],//整数位
                        "ve-attr96":    arg[6],//小数精度
                        "ve-attr115":   arg[7],//字段-展示表格扩展属性-表格中是否显示
                        "ve-attr89":    arg[8],//字段-输入/展示表格扩展属性-列域字典
                        "ve-attr90":    arg[9]//字段-输入/展示表格扩展属性-列域名称
                    };
                    if(structTp == "output"){
                        attrs["ve-attr115"]=undefined;
                    }

                    return attrs;
                };
                var unit_veFunc_col_item = function() {
                    const arg = arguments;
                    const funcs = {
                        "ve-func102": arg[0],//字段-输入表格扩展属性-列域下拉列表类型
                        "ve-func116": arg[1],//字段-展示表格扩展属性-下拉列表类型
                        "ve-func64": arg[2],//字段-域前基本属性-联动展示方式
                        "ve-func69": arg[3]//字段-域后基本属性-联动展示方式
                    };

                    return funcs;
                };
                /**
                 * 暂时返回为{}，方法预留
                 */
                var unit_veOpt_col_item = function() {
                    const arg = arguments;
                    const opts = {
                    };

                    return opts;
                };
                var unit_col_Item = function() {
                    const item = arguments[0],
                            structTp = arguments[1],
                            model = item.model,
                            label = item.label,
                            fieldTp = (item["ui-myselect"]||item.vBindSelect)!=undefined?'1':'0';// 0-select,1-input
                    
                    const tpMap = unit_box_text_dataTp(item,structTp);
                    const dataTp = tpMap.dataTp;//数据类型
                    const autoQiTp = tpMap.autoQiTp;
                    const autoQiVal = tpMap.autoQiVal;
                    const intLength = tpMap.intLength;
                    const dotLength = tpMap.dotLength;

                    let obj = {};

                    obj["id"] = fs.timeBacker('tableList');
                    obj["attr"] = unit_veAttr_col_item(fieldTp,dataTp,"1",autoQiTp,autoQiVal,intLength,dotLength,"1",model,label,structTp);//arguments.length = 11
                    obj["func"] = unit_veFunc_col_item('0','0','0','0');
                    obj["opt"] = unit_veOpt_col_item();
                    obj["type"] = "tableList";
                    obj["x"] = "3";

                    return obj;
                };
                
                var unit_Col_table = function() {
                    const arg = arguments;
                    const titleArr =    arg[0];
                    const fieldsArr =   arg[1];
                    const structTp =    arg[2];

                    let cols = [];
                    
                    for (let i = 0; i < fieldsArr.length; i++) {
                        const item = fieldsArr[i];
                        if(Object.keys(item).length ==0 || item.vBind=="x")
                            continue;

                        const model = item.model = item.vModel||item.vBind;
                        const label = item.label = titleArr[i];

                        unit_data_attr44_attr45(model, label);//data
    
                        let colItem = unit_col_Item(item,structTp);
                        cols.push(colItem);//col
    
                    }

                    return cols;
                };
                
                /**
                 * table域
                 */
                var unit_box_table = function () {
                    const arg = arguments[0];
                    const structTp = arguments[1];
                    // const tableType = arg.tableType == 'IN'? 'inTable':'outTable';// IN or OUT
                    const tableTp = structTp == "input" ? "inTable": "outTable";//input or output
                    const tableId = arg.tableRepeat;
                    const isEdit = '1';
                    const isSeqShow = '1';
                    const isImport = '1';
                    const isExport = '1';
                    const tableNm = arg.tableTitle;
                    const isOrder = '1';
                    const isDetail = '0';


                    let obj = {};
                    obj["id"] = fs.timeBacker(tableTp);
                    obj["attr"] = unit_veAttr_table(tableId,isEdit,isSeqShow,isImport,isExport,tableNm,structTp,isOrder,isDetail);//arguments.length=9
                    obj["func"] = unit_veFunc_table();
                    obj["opt"] = unit_veOpt_table();
                    obj["type"] = tableTp;
                    obj["x"] = "3";

                    obj["col"] = unit_Col_table(arg.tableHeads,arg.tableFields,structTp);//table标题，table内容, table类型; argument.length=3

                    return obj;
                };
                var unit_boxItem = (fieldItem,structTp) => {
                    const model = fieldItem.vModel || fieldItem.vBind;
                    const label = fieldItem.label;
                    const select = fieldItem.uiSelect || fieldItem.vBindSelect;// normal select
                    const tableTp = fieldItem.tableType;//table

                    const tpMap = unit_box_text_dataTp(fieldItem,structTp);
                    const dataTp = tpMap.dataTp;
                    const autoQiTp = tpMap.autoQiTp;
                    const autoQiVal = tpMap.autoQiVal;
                    const intLength = tpMap.intLength;
                    const dotLength = tpMap.dotLength;

                    const type = fieldItem.type;
                    
                    let boxItem;//box包含的对象
                    if (select != undefined && tableTp == undefined) {  //case 1.select
                        const selectTP = 'normalTp';

                        boxItem = unit_box_select(model, label, select, '0', '0', '0', '1', '', selectTP, structTp);//length=10
                    } else if (select == undefined && tableTp == undefined) {    //case 2.input
                        boxItem = unit_box_text(model, label, dataTp, '0', '0', autoQiTp, autoQiVal, intLength, dotLength, '0', '0', '', structTp, type);//length=14
                    } else if (tableTp != undefined) {
                        boxItem = unit_box_table(fieldItem,structTp);
                    }
                    
                    return boxItem;
                };
                var unit_box = (fieldItem,structTp) => {
                    //normal的情形
                    const boxItem = unit_boxItem(fieldItem,structTp);

                    if(typeof boxItem == "object"){
                        if (struct.box == undefined) {
                            struct.box = [];
                        }
                        struct.box.push(boxItem);
                    }
                    
                    return struct.box;
                };
                var unit_tabs = (fieldItem, structTp, title, pageIndexIndex) => {
                    //含有二级页签 tabs情形
                    const boxItem = unit_boxItem(fieldItem,structTp);

                    delete struct.box;
                    if(struct.tabs == undefined){
                        struct.tabs = [];
                    }
                    if (struct.tabs[pageIndexIndex] == undefined){
                        struct.tabs[pageIndexIndex] = {};
                    }
                    if(struct.tabs[pageIndexIndex].box == undefined){
                        struct.tabs[pageIndexIndex].box = [];
                        struct.tabs[pageIndexIndex].title = title;
                    }
                    if(typeof boxItem == "object"){
                        struct.tabs[pageIndexIndex].box.push(boxItem);
                    };
                };
                /**
                 * 内部函数定义结束=============================
                 */

                /**
                * 主函数处理开始-------------------------------
                */
                if (typeof data == "string")
                    data = JSON.parse(data);

                let fields = data;//输入域和输出屏的合集
                let code = data.trs_name;//代码

                const twoTp = ['inputFields','outputFields'];
                let result={
                    "inputFields": new Array,
                    "outputFields": new Array
                };
                let count = 1;//为page计数

                for (let i = 0; i < twoTp.length; i++) {//第一层：输入、输出page
                    const arrName = twoTp[i];
                    const pageLevel = fields[arrName];
                    const structTp = i==0?'input':'output';
                    let structArray = [];//每一个shift生成对应的struct，所以存放若干个struct，同时也是shift

                    for (let j = 0; j < pageLevel.length; j++) {//第二层：shiftSheet
                        const shiftLevel = pageLevel[j];//每一个shift生成对应的struct
                        const pageIndexLevel = shiftLevel.list;
                        const isTabs =  pageIndexLevel && pageIndexLevel.length>1;
                        
                        
                        unit_name(code, count++);//name
                        unit_loop('0');//loop，默认0-false，不循环
                        unit_title("");//title，默认无标题
                        unit_type(structTp);//type
                        unit_mode(isTabs);//mode

                        for (let k = 0; k < pageIndexLevel.length; k++) {//第三层：pageIndexSheet
                            const pageIndexItem = pageIndexLevel[k];

                            for (let l = 0; l < pageIndexItem.list.length; l++) {//第四层：fields域
                                const fieldItem = pageIndexItem.list[l];                          
                                const model = fieldItem.vModel||fieldItem.vBind;
                                const label = fieldItem.label;
                                
                                unit_data_attr44_attr45(model, label);//data
                                if(isTabs){
                                    const title = pageIndexItem.title;
                                    unit_tabs(fieldItem,structTp,title,k);//tabs
                                }else{
                                    unit_box(fieldItem,structTp);//box
                                }
                                
                                
                            }
                            
                        }
                        //此处，struct已经生成
                        structArray.push(JSON.parse(JSON.stringify(struct)));
                        fs.reset(struct);//深层清理数组
    
                    }

                    result[arrName] = JSON.parse(JSON.stringify(structArray));
                    
                    
                }

                return result;

                /**
                * 主函数处理结束===============================
                */




            },
            vbTransLink: (pageNm1,pageNm2,code) => {
                //构建[code].ve文件
                const name = '';
                const type = 'single';
                const attr = {
                    "ve-opt127":code||""
                };
                const pages = {};
                const inputList = pageNm1.length>0?pageNm1:[];
                const outputList = pageNm2.length>0?pageNm2:[];

                return {name,type,attr,pages,inputList,outputList};

            },
            writeFile: (path, fd) => {
                require('fs').writeFile(path, JSON.stringify(fd), 'utf8', (err) => {
                    if (err) { throw err; }
                });
            },
            temp: (targetPath,transCode,file) => {
                const timer_temp = fs.timeBacker(transCode);
                const tempPath = require('path').join(targetPath, 'temp', timer_temp + '.json');

                fs.writeFile(tempPath,file);//vbat自定义输出写入temp
            },
            tempSetOn: (bool) =>{
                if(typeof bool == "boolean")
                    return fs.options.tempSet = bool;
            },
            run: (sourcePath,targetPath) => {
                const modurl = fs.readDir(sourcePath,"-R");
                const rootPath = targetPath;
                const targetsPagePre = require('path').join(rootPath, 'pages');
                const total = modurl.length;

                //获取读到的内容列表长度
                log(`find [ mod ] files number: ${total}`);

                let result = [];
                let codes = [];

                for (let i = 0; i < total; i++) {

                    let file = modurl[i];//处理这些文件

                    const vb = vBat();
                    let item = vb.analysisFile(file.path,file.code);
                    if(item != undefined){
                        let code = file.code;
                        let info = item;
                        
                        if(result.includes(code)){
                            vb.log(`[ERROR]:${code} has exist!`);
                        }

                        result.push(info);
                        codes.push(code);
                    }
                          
                }

                for (let i = 0; i < result.length; i++) {
                    const file = result[i];
                    const final = fs.vbToToolsConfig(file);//转换input到目标格式
                    //
                    let inputShifts = final.inputFields,
                        outputShifts = final.outputFields,
                        timerArray1 = [],
                        timerArray2 = [];

                    if(fs.options.tempSet == true){
                        fs.temp(rootPath,file.trs_name,file);//同步存储temp.json文件
                    }
                    
                    for (let i = 0; i < inputShifts.length; i++) {
                        const boxNotNull = inputShifts[i].mode == "tabs" || (inputShifts[i].mode == "normal" && inputShifts[i]["box"].length >0);

                        if(boxNotNull){
                            const t = fs.timeBacker('page');
                            const pagePath =  require('path').join(targetsPagePre, t +'.ve');
                            timerArray1.push(t);
                            fs.writeFile(pagePath,inputShifts[i]);//录入页目标格式输出写入targets
                        }
                        
                    }
                    for (let i = 0; i < outputShifts.length; i++) {
                        const boxNotNull = outputShifts[i].mode == "tabs" || (outputShifts[i].mode == "normal" && outputShifts[i]["box"].length >0);

                        if(boxNotNull){
                            const t = fs.timeBacker('page');
                            const pagePath =  require('path').join(targetsPagePre, t +'.ve');
                            timerArray2.push(t);
                            fs.writeFile(pagePath,outputShifts[i]);//结果页目标格式输出写入targets
                        }
                    }                   

                    const name = file.trs_name||undefined;
                    const trans_struct = fs.vbTransLink(timerArray1,timerArray2,name);

                    const pagePath = require('path').join(rootPath,  name+'.ve');
                        
                    fs.writeFile(pagePath,trans_struct);//目标交易格式输出写入targets根目录
                    
                }
                log(`complete [ mod ] number：${result.length}`);
            }
        };
    /**
     * =========================================================
     */

    init.prototype = vBat.fn;

    return module.exports = window.vBat = vBat;

})(typeof window !== "undefined" ? window : this, typeof module !== "undefined" ? module : {});