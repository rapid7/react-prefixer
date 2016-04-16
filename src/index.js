export default process.versions.node
    ? x => x
    : require('./browser')
