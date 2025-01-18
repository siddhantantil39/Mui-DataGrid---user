const useDebounce = (fn : ()=> void, t: number) => {
    let timer : ReturnType<typeof setTimeout>;
    return function(){
        clearTimeout(timer);
        timer = setTimeout(fn,t,);
    }
}

export default useDebounce;