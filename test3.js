function doStuff(params) {
    console.log('doing stuff...');
    console.log(params.stuff);
    console.log(params.name);
}

const stuff = "lallalaa";
const name = 'pera';
doStuff({stuff, name});