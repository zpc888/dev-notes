function idMaker() {
    let index = 0;
    return {
        next: function() {
            return {
                value: index++,
                done:  false
            };
        }
    };
}

const call = () => {
    const it = idMaker();
    console.log( it.next().value );
    console.log( it.next().value );
    console.log( it.next().value );
}
call();
call();