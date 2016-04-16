export default typeof process === 'object' && process + '' === '[object process]'
    ? x => x
    : require('./browser')
