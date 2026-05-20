const delay = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const randomDelay = async (min, max) => {
    const tempo =
        Math.floor(Math.random() * (max - min + 1)) + min;

    await delay(tempo);
}

module.exports = {
    delay,
    randomDelay
}