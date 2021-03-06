export default {
    login:'/auth/salePersonLogin/login',//登陆
    modifyPsw:'/auth/salePersonLogin/modifyPsw',//修改密码
    //首页
    brand:'/auth/home/brand',//品牌logo
    hottest:'/auth/home/hottest',//最热
    favoured:'/auth/home/favoured',//最惠
    newest:'/auth/home/newest',//最新
    collection:'/auth/home/collection',//最爱

    bigRange:'/auth/product/bigRange',//大类
    smallRange:'/auth/product/smallRange',//小类
    productbrand:'/auth/product/brand',//品牌
    series:'/auth/product/series',//系列
    productChoose:'/auth/product/productChoose',//删选
    //详情
    productDetail:'/auth/product/productDetail',//产品详情
    sameSeries:'/auth/product/sameSeries',//同系列产品
    picTurns:'/auth/product/picTurns',//轮播图
    productSpread:'/auth/product/productSpread',//库存分布
    startStock:'/auth/visit/startStock',//发起占用
    stockDetails:'/auth/product/stockDetails',//占用量详情
    //来访记录
    setNo:'/auth/visit/setNo',//获取接待编号
    addVisitRecord:'/auth/visit/addVisitRecord',//客户登记录入记录
    cusSearch:'/auth/visit/cusSearch',//搜索接待列表
    editCus:'/auth/visit/editCus',//修改接待记录
    //收藏
    addVisitCollection:'/auth/visit/addVisitCollection',//接待收藏
    mycollection:'/auth/product/collection',//我的最爱
    productCollectionSearch:'/auth/visit/productCollectionSearch',//搜索收藏列表
    productCollectionDel:'/auth/visit/productCollectionDel',//取消收藏
    //库存占用
    showStock:'/auth/visit/showStock',//库存占用列表
    applyRollover:'/auth/visit/applyRollover',//库存续期
    cancelStock:'/auth/visit/cancelStock',//库存取消占用
    //我的最爱
    searchMyCollection:'/auth/product/searchMyCollection',//收索销售收藏我的最爱列表
    delCollection:'/auth/product/delCollection',//我的最爱列表删除
    //报价单
    showQuotation:'/auth/quotation/showQuotation',//我的最爱列表删除
    upload:'/auth/quotation/upload',//上传excle
    applyQuotation:'/auth/quotation/applyQuotation',//发起报价
}