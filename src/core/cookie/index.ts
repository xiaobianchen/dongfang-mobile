const CookieUtils = {
    /**
     * 保存Cookie
     * @param name  key
     * @param value value
     * @param min   有效时间（min）
     */
    saveCookie: (name: string, value: any, min: any) => {
        let expires = "";
        if (min) {
            const date = new Date();
            date.setTime(date.getTime() + (min * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + value + expires + "; path=/";
    },

    /**
     * 读取cookie
     * @param name
     * @returns {any}
     */
    readCookie: (name: string) => {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for (let c of ca) {
            while (c.charAt(0) === ' ') {
                c = c.substring(1, c.length);
            }
            if (c.indexOf(nameEQ) === 0) {
                return c.substring(nameEQ.length, c.length)
            }
        }
        return null;
    },

    /**
     * 移除Cookie
     * @param name
     */
    removeCookie: (name: string) => {
        CookieUtils.saveCookie(name, "", -1);
    }
};

export default CookieUtils;