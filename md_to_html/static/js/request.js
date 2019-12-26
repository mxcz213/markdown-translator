/**
 * @desc 封装请求方法
 * @params Object
 */
const request = (url, method = 'GET', params = {}) => {
    let config = {
        cache: 'no-cache',
        headers: {
            'content-type': 'application/json'
        },
        method
    };
    if(method !== 'GET'){
        config.body = JSON.stringify(params);
    }
    return fetch(url, config)
    .then(response => response.json())
}

const MD2HTML_Service = {
    /**
     * @desc 新建文章
     * @method POST
     */
    addService: (params) => {
        return request('/add', 'POST', params)
    },
    /**
     * @desc 更新文章
     * @method PUT
     */
    updateService: (params) => {
        return request('/update/'+params.id, 'PUT', params)
    },
    /**
     * @desc 获取文章的content
     * @method GET
     */
    getContentService: (id) => {
        return request('/getContent/' + id)
    },
    /**
     * @desc 删除文章
     * @method DELETE
     */
    deleteService: (id) => {
        return request('/delete', 'POST', { id })
    },
    /**
     * @desc 获取文章列表
     * @method GET
     */
    getListService: () => {
        return request('/articleList')
    }
}

window.MD2HTML_Service = MD2HTML_Service