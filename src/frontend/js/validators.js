const checkUrlRegex = (url) => {
    const urlRegex = /^(http|https):\/\/[^ "]+$/;
    return urlRegex.test(url);
}

export { checkUrlRegex };
