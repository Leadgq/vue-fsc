import fileSaver from "file-saver";
import {Ref} from "vue";
// 千分符
export const toThousands = (num: number | string | Ref<string | number>) => typeof unref(num) === 'string' ? Number(unref(num)).toLocaleString() : unref(num).toLocaleString();
// 下载文件
export const downloadFile = (url: string | Blob | Ref<string | Blob>, name: string | Ref<string>) => fileSaver.saveAs(unref(url), unref(name));
// 是否是一个数组
export const isArray = (arr: any[] | Ref<any []>) => Object.prototype.toString.call(unref(arr)) === '[object Array]';
// 是否是一个对象
export const isObject = (obj: Record<string, any> | Ref<Record<string, any>>) => Object.prototype.toString.call(unref(obj)) === '[object Object]';
// 是否是一个可用数组
export const isAvailableArray = (arr: any[] | Ref<any[]>) => isArray(arr) && Array.isArray(unref(arr)) && unref(arr).length > 0;
// 是否是一个可用对象
export const isAvailableObject = (obj: Record<string, any> | Ref<Record<string, any>>) => isObject(obj) && Reflect.ownKeys(unref(obj)).length !== 0;
// 对象中所有项是否都有值
export const isAvailableObjectValue = (obj: Record<string, any> | Ref<Record<string, any>>) => isAvailableObject(obj) && Object.values(unref(obj)).every(item => item && item !== 0);
// 是否是一个函数
export const isFunction = (fn: Function) => typeof fn === 'function';
// 是否是一个Promise
export const isPromiseFunction = (fn: Promise<Function>) => isObject(fn) && isFunction(fn.then) && isFunction(fn.catch);
// 是否是一个可用的手机号
export const isAvailablePhone = (phone: string | Ref<string>) => /^1[3,4,5,6,7,8,9][0-9]{9}$/.test(unref(phone))
// 是否是一个可用的邮箱
export const isAvailableEmail = (email: string | Ref<string>) => /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(unref(email))
// 是否是一个可用的身份证号码
export const isAvailableIdCard = (idCard: string | Ref<string>) => /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(unref(idCard))
// 是否是一个固定电话
export const isAvailableLandline = (tel: string | Ref<string>) => /^\d{3,4}-\d{7,8}(-\d{3,4})?$/.test(unref(tel));
// 是否相同
export const isIdentical = (x: unknown, y: unknown) => Object.is(x, y);
// 是否是一个可用的车牌号
export const isAvailableCarNo = (no: string | Ref<string>) => {
    const cardNo = unref(no);
    // 新能源车牌
    const newCardReg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF]$)|([DF][A-HJ-NP-Z0-9][0-9]{4}$))/
    // 旧车牌
    const oldCrdReg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1}$/
    if (cardNo.length === 7) return oldCrdReg.test(cardNo)
    if (cardNo.length === 8) return newCardReg.test(cardNo)
    return false
}
//只能输入字母
export const letter = (letter: string | Ref<string>) => /^[a-zA-Z]*$/.test(unref(letter));
// 只能是字母或者数字
export const enOrNum = (value: string | number | Ref<string | number>) => /^[0-9a-zA-Z]*$/g.test(unref(String(value)));
// 生成随机数不包括最大值
export const randomMax = (min: number, max: number) => Math.floor(Math.random() * (max - min) + min);
// 生成随机数包括最大值
export const randomIncludeMax = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min);
// 手机号中间四位变成*
export const telFormat = (tel: string | number | Ref<string | number>) => {
    let telPhone = String(unref(tel));
    let reg = /(?<=\d{4})(.+)(?=\d{3})/gi;
    return telPhone.replace(reg,()=> "*".repeat(4));
};
// 处理大文件
export const handlerMoreData = async () => {
    const worker = await initWebWorker();
    return new Promise((resolve) => {
        worker.postMessage({
            type: 'handlerData'
        });
        worker.onmessage = (result: Record<string, any>) => {
            resolve(result.data);
        }
    })
}
// 加载文件夹中的数据
export const loadFile = async (fileName: string) => {
    const worker = await initWebWorker();
    return new Promise((resolve) => {
        worker.postMessage({
            type: 'load',
            fileName
        })
        worker.onmessage = (result: Record<string, any>) => {
            resolve(result.data);
        }
    })
}
// 初始化web-worker
const initWebWorker = (): Promise<Worker> => {
    return new Promise((resolve) => {
        const worker = new Worker(new URL('./worker.ts', import.meta.url), {type: 'module'})
        resolve(worker);
    })
}

interface job {
    id?: number
}

// 二分
const findInsertionIndex = (id: number, queue: job[]) => {
    let start = 0
    let end = queue.length
    while (start < end) {
        const middle = (start + end) >>> 1
        const middleJobId = getId(queue[middle])
        middleJobId < id ? (start = middle + 1) : (end = middle)
    }
    return start
}
// 返回id
const getId = (obj: job): number => obj.id == null ? Infinity : obj.id
