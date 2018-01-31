export function getRedirectPath({type, avatar}) {
    //  区分type  之后 区分 avatar
    let path = (type === 'genius') ? '/genius' : '/boss';
    //  如果没有图像 进入到个人信息 设置页
    if (!avatar) {
        path += 'info'
    }
    return path;
}