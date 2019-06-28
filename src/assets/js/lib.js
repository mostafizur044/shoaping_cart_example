export default function utility() {
    function QuerySelector() {
        this.getDomByQuery = (selector) => {
            return document.querySelector(selector);
        };

        this.getAllDomByQuery = (selector) => {
            return document.querySelectorAll(selector);
        };

        this.getDomByClass = (selector) => {
            return document.getElementsByClassName(selector);
        };

        this.setDomInnerHTML = (dom, value) => {
            const len = dom.length;
            if(len) {
                for (let e = 0; e < len; e++) {
                    dom[e].innerHTML = value;
                }
            } else {
                dom.innerHTML = value;
            }
        };
    }

    function WebStorage() {
        this.getData = (name, initValue) => {
            const data = localStorage.getItem(name);
            return data && IsJsonString(data) ? JSON.parse(data) : initValue;
        };

        this.setData = (name, data) => {
            const jsonString = JSON.stringify(data);
            localStorage.setItem(name, jsonString);
        };

        function IsJsonString(str) {
            try {
                JSON.parse(str);
            } catch (e) {
                return false;
            }
            return true;
        }
    }

    function Event() {
        this.addClickEvent = (dom, event, callBack) => {
            const len = dom.length;
            if('length' in dom) {
                for (let i = 0; i < len; i++) {
                    dom[i].addEventListener(event, (e) => {
                        callBack(e);
                    }, false);
                }
            } else {
                dom.addEventListener(event, (e) => {
                    callBack(e);
                }, false);
            }
        };
    }

    function ClassList() {
        this.remove = (dom, className) => {
            if(dom.classList.contains(className)) 
                dom.classList.remove(className);
            
        };

        this.add = (dom, className) => {
            dom.classList.add(className);
        };

        this.toggle = (dom, className) => {
            dom.classList.toggle(className);
        };

        this.addRemove = (dom, removeClass, addClass) => {
            this.remove(dom, removeClass);
            this.add(dom, addClass);
        }
    }

    return {
        domQuery: new QuerySelector(),
        storage: new WebStorage(),
        event: new Event(),
        classManipulation: new ClassList()
    }
}