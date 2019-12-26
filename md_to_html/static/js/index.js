;(function(){
    const { debounce } = MD2HTML_Util
    const { 
        addService, 
        getContentService, 
        getListService, 
        deleteService,
        updateService
    } = MD2HTML_Service

    const new_article = document.getElementById('new_article')
    const articleList = document.getElementById('article-list')
    const add_title = document.getElementById('add_title')
    const editor_origin = document.getElementById('editor-origin')

    const html_title = document.getElementById('html-title')
    const html_content = document.getElementById('html-content')
    
    let ID = null;
    let global_index = 0

    function addController (params, cb){
        let id = null, content = null, title = null
        addService(params)
        .then((res) => {
            return new Promise((resolve, reject) => {
                id = res.data.id
                title = res.data.title
                getContentService(id)
                .then((resp) => {
                    content = resp.data.content
                    resolve()
                })
            })
        })
        .then(() => {
            if(cb) cb({id, title, content})
        })
    }

    function getArticleList(){
        getListService()
        .then((resp) => {
            if(resp.code == 0){
                //resp.data.reverse();
                let fragment = document.createDocumentFragment()
                resp.data.forEach((item, index) => {
                    let li = document.createElement('li')
                    li.setAttribute('data-index', index)
                    li.setAttribute('data-id', item.id)
                    li.className = 'li-title';
                    li.textContent = item.title
                    let span = document.createElement('span')
                    span.setAttribute('data-id', item.id)
                    span.className = 'delete-article'
                    span.textContent = '删除'
                    li.appendChild(span)
                    fragment.appendChild(li)
                })
                if(articleList.children.length > 0){
                    articleList.innerHTML = ''
                }
                articleList.appendChild(fragment)

                const li = articleList.querySelectorAll('.li-title')
                if(li.length > 0){
                    if(global_index != 0){
                        ID = resp.data[global_index].id
                        title = resp.data[global_index].title
                        content = resp.data[global_index].content
                        li[global_index].className = 'li-title active'
                    } else{
                        ID = resp.data[0].id
                        title = resp.data[0].title
                        content = resp.data[0].content
                        li[0].className = 'li-title active'
                    }
                }
                add_title.value = html_title.innerHTML = title
                editor_origin.value = content

                html_content.innerHTML = renderHtml(content)
            } else {
                console.log(resp.message)
            }
        })
    }

    function updateArticle(params){
        updateService(params)
        .then(res => {
            const data = res.data
            if(res.code === 0){
                html_title.innerHTML = data.title
                html_content.innerHTML = renderHtml(data.content)

                add_title.value = data.title
                editor_origin.value = data.content

                getArticleList()
            }
        })
    }

    getArticleList();

    new_article.onclick = function(){
        addController({title: '2019-11-14', author: 'hcj'}, (article) => {
            add_title.value = article.title
            editor_origin.value = article.content
        })
        getArticleList()
    }

    articleList.onclick = function(e){
        const target = e.target
        const li = articleList.querySelectorAll('.li-title')
        if(target.className.indexOf('li-title') > -1){
            const index = target.getAttribute('data-index')
            global_index = index
            const id = target.getAttribute('data-id')
            ID = id
            li.forEach((item) => {
                item.className = 'li-title'
            })
            li[index].className = 'li-title active'
            getContentService(id)
            .then((resp) => {
                add_title.value = resp.data.title
                editor_origin.value = resp.data.content

                html_title.innerHTML = resp.data.title
                html_content.innerHTML = renderHtml(resp.data.content)
            })
            
        }
        if(target.className == 'delete-article'){
            //删除接口
            const id = target.getAttribute('data-id')
            deleteService(id)
            .then((res) => {
                if(res.code === 0){
                    getArticleList();
                } else {
                    console.log(res.message)
                }
            })
        }
    }

    add_title.onkeyup = editor_origin.onkeyup = debounce(() => {
        const params = {
            id: ID,
            title: add_title.value,
            content: editor_origin.value,
            author: 'hcj'
        }
        updateArticle(params)
    }, 1000)


    function renderHtml(text){
        let htmlStr = MdtoHtml(text)
        return htmlStr;
    }
})();