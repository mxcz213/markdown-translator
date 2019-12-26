// 函数防抖（debounce）：事件再触发n秒之后再执行回调，如果在n秒之后又被重新触发，则重新计时。
// 函数节流（throttle）：指定时间间隔内只会执行一次任务。

const MD2HTML_Util = {
    debounce: (fn, wait = 300) => {
        let timeout = null;
        return function () {
            let context = this;
            let args = arguments;
            if(timeout) clearTimeout(timeout);
            
            timeout = setTimeout(() => {
                fn.apply(context, args);
            }, wait);
        };
    },
    throttle: (fn, wait = 300) => {
        let canRun = true;
        return function () {
            if (!canRun) return;
            canRun = false;
            setTimeout(() => {
                fn.apply(this, arguments);
                canRun = true;
            }, wait);
        };
    }
}

window.MD2HTML_Util = MD2HTML_Util;